import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";
import NextAuth from "next-auth";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

// Se você precisar exportar os handlers, signIn, signOut, etc.
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
