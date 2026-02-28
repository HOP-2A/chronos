import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ companyId: string }> },
) => {
  const { companyId } = await params;
  const OneCompany = await prisma.company.findFirst({
    where: { id: companyId },
  });
  return NextResponse.json(OneCompany);
};

