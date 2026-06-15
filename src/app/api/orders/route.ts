import { getCurrentUser } from "@/auth/current-user";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Not signed in" }, { status: 401 });
  }

  await connectToDatabase();
  const orders = await Order.find({ userId: user.id }).sort({ createdAt: -1 });

  return Response.json({
    orders: orders.map((order) => ({
      id: order._id.toString(),
      status: order.status,
      currency: order.currency,
      amountMinor: order.amountMinor,
      subtotalInr: order.subtotalInr,
      razorpayPaymentId: order.razorpayPaymentId,
      lines: order.lines,
      createdAt: order.createdAt,
    })),
  });
}
