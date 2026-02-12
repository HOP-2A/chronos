import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ companyId: string }> },
) {
  const { companyId } = await context.params;
  const company = await prisma.company.findUnique({
    where: { id: companyId },
  });

  if (!company) {
    return NextResponse.json("company NOT FOUND");
  }
  return NextResponse.json(company);
}
