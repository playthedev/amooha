import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth/current-user";
import { AccountPanel } from "./account-panel";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/signin?next=/account");

  return <AccountPanel user={user} />;
}
