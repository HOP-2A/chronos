import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, name, phoneNumber, companyId } = await req.json();
  const admin = await prisma.admin.create({
    data: { email, name, phoneNumber, companyId },
  });
  return NextResponse.json(admin);
};

export const GET = async () => {
  const adminGet = await prisma.admin.findMany({});
  return NextResponse.json(adminGet);
};
