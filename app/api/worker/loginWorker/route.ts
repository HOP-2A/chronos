import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, name, phoneNumber, experience, feedback, companyId, userId } =
    await req.json();

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "User olqsongua" }, { status: 404 });
  }

  const existingWorker = await prisma.worker.findUnique({
    where: { id: user.clerkId },
  });

  if (!existingWorker) {
    const createdWorker = await prisma.worker.create({
      data: {
        email,
        clerkId: user.clerkId,
        name,
        phoneNumber,
        experience,
        feedback,
        companyId,
      },
    });
    return NextResponse.json(createdWorker, { status: 200 });
  } else {
    return NextResponse.json({ error: "Worker bainaa" }, { status: 404 });
  }
}
