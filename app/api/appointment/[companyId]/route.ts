import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  context: { params: Promise<{ companyId: string }> },
) => {
  const { companyId } = await context.params;
  const response = await prisma.appointment.findMany({
    where: { companyId: companyId },
  });
  return NextResponse.json(response);
};
