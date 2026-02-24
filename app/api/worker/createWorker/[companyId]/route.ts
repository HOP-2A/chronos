import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  context: { params: Promise<{ companyId: string }> },
) => {
  const { companyId } = await context.params;

  const { email, name, phoneNumber, experience, status } = await req.json();
  const createWorker = await prisma.worker.create({
    data: {
      email,
      name,
      phoneNumber,
      experience,
      companyId,
      status,
    },
  });
  return NextResponse.json(createWorker);
};
