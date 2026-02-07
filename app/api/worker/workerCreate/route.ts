import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { email, name, phoneNumber, experience, feedback, companyId, userId } =
    body;

  if (!email || !name || !userId) {
    return NextResponse.json(
      { error: "email, name, and userId are required" },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Check if a Worker with this clerkId already existsooo
  const existingWorker = await prisma.worker.findFirst({
    where: { clerkId: user.clerkId },
  });

  if (existingWorker) {
    return NextResponse.json(
      { error: "Worker with this clerkId already exists" },
      { status: 409 },
    );
  }

  // Create the Worker
  const worker = await prisma.worker.create({
    data: {
      email,
      clerkId: user.clerkId, // <-- Get clerkId from User
      name,
      phoneNumber,
      experience: experience ?? [],
      feedback: feedback ?? [],
      companyId: companyId ?? null,
    },
  });

  return NextResponse.json(worker, { status: 201 });
}
