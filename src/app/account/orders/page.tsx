import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth/current-user";
import { OrdersList } from "./orders-list";

export default async function OrdersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/signin?next=/account/orders");

  return <OrdersList />;
}
