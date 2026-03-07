import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ role: null });
  }

  const worker = await prisma.worker.findUnique({
    where: { clerkId: userId },
  });

  if (worker) {
    return NextResponse.json({ role: "WORKER", id: worker.id });
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (user) {
    return NextResponse.json({ role: "USER", id: user.id });
  }

  return NextResponse.json({ role: null });
}
