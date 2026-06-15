import Razorpay from "razorpay";
import { getCurrentUser } from "@/auth/current-user";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { indexBySlug } from "@/commerce/catalog";
import { en } from "@/i18n/dictionaries/en";
import {
  pricedLinesFromInput,
  subtotalInrFromLines,
  toMinorUnits,
  type LineInput,
} from "@/commerce/pricing";

// Always run on the server at request time — we read secrets and recompute prices.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ShippingInput = {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  stateRegion?: string;
  postalCode?: string;
  country?: string;
};

type Body = {
  items?: LineInput[];
  currency?: string;
  shipping?: ShippingInput;
};

const REQUIRED_SHIPPING_FIELDS: (keyof ShippingInput)[] = [
  "fullName",
  "email",
  "phone",
  "address",
  "city",
  "stateRegion",
  "postalCode",
  "country",
];

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "You must be signed in to place an order" }, { status: 401 });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const shipping = body.shipping ?? {};
  for (const field of REQUIRED_SHIPPING_FIELDS) {
    if (!shipping[field] || !String(shipping[field]).trim()) {
      return Response.json({ error: `Missing shipping field: ${field}` }, { status: 400 });
    }
  }

  const rawLines = Array.isArray(body.items) ? body.items : [];
  const lines = pricedLinesFromInput(rawLines);
  const subtotalInr = subtotalInrFromLines(rawLines);
  if (lines.length === 0 || subtotalInr <= 0) {
    return Response.json({ error: "Empty or invalid cart" }, { status: 400 });
  }

  const { currency, minor, major } = await toMinorUnits(subtotalInr, body.currency ?? "INR");

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return Response.json({ error: "Payments are not configured" }, { status: 500 });
  }

  const receipt = `amh_${Date.now().toString(36)}`;

  try {
    const rzp = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const razorpayOrder = await rzp.orders.create({
      amount: minor,
      currency,
      receipt,
      notes: { subtotal_inr: String(subtotalInr), user_id: user.id },
    });

    await connectToDatabase();
    await Order.create({
      userId: user.id,
      lines: lines.map((line) => {
        const idx = indexBySlug(line.slug);
        const name = idx >= 0 ? en.products.items[idx]?.name ?? line.slug : line.slug;
        return {
          slug: line.slug,
          variantId: line.variantId,
          name,
          variantLabel: line.variantLabel,
          qty: line.qty,
          unitPriceInr: line.unitPriceInr,
        };
      }),
      subtotalInr,
      currency: razorpayOrder.currency,
      amountMinor: Number(razorpayOrder.amount),
      razorpayOrderId: razorpayOrder.id,
      status: "created",
      shipping: {
        fullName: String(shipping.fullName).trim(),
        email: String(shipping.email).trim(),
        phone: String(shipping.phone).trim(),
        address: String(shipping.address).trim(),
        city: String(shipping.city).trim(),
        stateRegion: String(shipping.stateRegion).trim(),
        postalCode: String(shipping.postalCode).trim(),
        country: String(shipping.country).trim(),
      },
    });

    return Response.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId,
      subtotalInr,
      displayMajor: major,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Razorpay order failed";
    return Response.json({ error: message }, { status: 502 });
  }
}
