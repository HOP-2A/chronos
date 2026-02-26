import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ companyId: string }> },
) {
  const { companyId } = await context.params;

  if (!companyId) {
    return NextResponse.json(
      { error: "Company ID is required" },
      { status: 400 },
    );
  }

  const workers = await prisma.worker.findMany({
    where: {
      companyId,
    },
    select: {
      id: true,
      email: true,
      name: true,
      feedback: true,
      experience: true,
    },
  });

  return NextResponse.json(workers);
}
