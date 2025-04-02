// src/app/actions/user-actions.ts
"use server";

import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function updateUserProfile(formData: FormData) {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }
  
  const name = formData.get("name") as string;
  
  await prisma.user.update({
    where: {
      id: session.user.id
    },
    data: {
      name
    }
  });
  
  revalidatePath("/profile");
  return { success: true };
}
