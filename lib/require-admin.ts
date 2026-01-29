import "server-only";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export async function requireAdmin() {
  const session = await auth();

  if (!session.userId) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: session.userId },
    select: { role: true },
  });

  if (!user || user.role !== "SUPERADMIN") {
    redirect("/403");
  }

  return user;
}
