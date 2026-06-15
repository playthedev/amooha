import crypto from "node:crypto";
import { connectToDatabase } from "@/lib/mongodb";
import { sendOrderConfirmationEmails } from "@/lib/order-emails";
import { Order } from "@/models/Order";

// Razorpay webhooks are the authoritative source of truth for payment status —
// they fire server-to-server even if the customer closes the tab before the
// client-side handler runs, so the order ledger stays correct either way.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RazorpayWebhookPayload = {
  event?: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
        status?: string;
      };
    };
  };
};

export async function POST(req: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    return Response.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const signature = req.headers.get("x-razorpay-signature");
  if (!signature) {
    return Response.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await req.text();

  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  const valid = a.length === b.length && crypto.timingSafeEqual(a, b);
  if (!valid) {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  let body: RazorpayWebhookPayload;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = body.event;
  const payment = body.payload?.payment?.entity;

  if ((event === "payment.captured" || event === "order.paid") && payment?.order_id) {
    await connectToDatabase();
    const order = await Order.findOne({ razorpayOrderId: payment.order_id });
    if (order && order.status !== "paid") {
      order.status = "paid";
      order.razorpayPaymentId = payment.id ?? order.razorpayPaymentId;
      await order.save();

      try {
        await sendOrderConfirmationEmails(order);
      } catch (err) {
        console.error("Failed to send order confirmation emails:", err);
      }
    }
  }

  if (event === "payment.failed" && payment?.order_id) {
    await connectToDatabase();
    const order = await Order.findOne({ razorpayOrderId: payment.order_id });
    if (order && order.status === "created") {
      order.status = "failed";
      await order.save();
    }
  }

  return Response.json({ received: true });
}
