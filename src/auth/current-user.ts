import { connectToDatabase } from "@/lib/mongodb";
import { User, type UserDocument } from "@/models/User";
import { getSession } from "./session";

export type SafeUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
};

function toSafeUser(user: UserDocument): SafeUser {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt.toISOString(),
  };
}

/** Returns the signed-in user (server-side), or null if not authenticated. */
export async function getCurrentUser(): Promise<SafeUser | null> {
  const session = await getSession();
  if (!session) return null;

  await connectToDatabase();
  const user = await User.findById(session.userId);
  if (!user) return null;

  return toSafeUser(user);
}
