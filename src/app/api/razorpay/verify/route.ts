import crypto from "node:crypto";
import { getCurrentUser } from "@/auth/current-user";
import { connectToDatabase } from "@/lib/mongodb";
import { sendOrderConfirmationEmails } from "@/lib/order-emails";
import { Order } from "@/models/Order";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ valid: false, error: "Not signed in" }, { status: 401 });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ valid: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return Response.json({ valid: false, error: "Missing fields" }, { status: 400 });
  }

  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    return Response.json({ valid: false, error: "Server not configured" }, { status: 500 });
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(razorpay_signature);
  const signatureValid = a.length === b.length && crypto.timingSafeEqual(a, b);
  if (!signatureValid) {
    return Response.json({ valid: false, error: "Invalid signature" }, { status: 400 });
  }

  await connectToDatabase();
  const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
  if (!order) {
    return Response.json({ valid: false, error: "Order not found" }, { status: 404 });
  }
  if (order.userId.toString() !== user.id) {
    return Response.json({ valid: false, error: "Order does not belong to this user" }, { status: 403 });
  }

  // Idempotent: if this order was already verified/paid, return success again
  // without re-writing — avoids replay weirdness if the client retries.
  if (order.status === "paid") {
    return Response.json({ valid: true, orderId: order._id.toString() });
  }

  order.status = "paid";
  order.razorpayPaymentId = razorpay_payment_id;
  await order.save();

  try {
    await sendOrderConfirmationEmails(order);
  } catch (err) {
    console.error("Failed to send order confirmation emails:", err);
  }

  return Response.json({ valid: true, orderId: order._id.toString() });
}
