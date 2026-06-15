import mongoose from "mongoose";
import Razorpay from "razorpay";
import { getCurrentUser } from "@/auth/current-user";
import { connectToDatabase } from "@/lib/mongodb";
import { Order, type OrderDocument } from "@/models/Order";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Without a webhook, the client-side Razorpay handler is the only normal path
 * that marks an order paid — if the user closes the tab right after paying,
 * the order would stay "created" forever even though money was captured.
 * So when the success page asks about a "created" order, reconcile it
 * directly against the Razorpay API as a fallback.
 */
async function reconcileWithRazorpay(
  order: mongoose.HydratedDocument<OrderDocument>,
): Promise<mongoose.HydratedDocument<OrderDocument>> {
  if (order.status !== "created") return order;

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return order;

  try {
    const rzp = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const payments = await rzp.orders.fetchPayments(order.razorpayOrderId);
    const captured = payments.items.find(
      (p) => p.status === "captured" || p.status === "authorized",
    );
    if (captured) {
      order.status = "paid";
      order.razorpayPaymentId = captured.id;
      await order.save();
    }
  } catch {
    // Razorpay API unreachable or order not found there yet — leave as-is,
    // the client can retry by polling this endpoint again.
  }

  return order;
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Not signed in" }, { status: 401 });
  }

  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  await connectToDatabase();
  let order = await Order.findById(id);
  if (!order || order.userId.toString() !== user.id) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  order = await reconcileWithRazorpay(order);

  return Response.json({
    order: {
      id: order._id.toString(),
      status: order.status,
      currency: order.currency,
      amountMinor: order.amountMinor,
      subtotalInr: order.subtotalInr,
      razorpayPaymentId: order.razorpayPaymentId,
      lines: order.lines,
      createdAt: order.createdAt,
    },
  });
}
