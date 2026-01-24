import prisma from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { workerId, companyId, customerId } = await req.json();
  const CreateSuperAdmin = await prisma.superAdmin.create({
    data: { workerId, customerId, companyId },
  });
  return NextResponse.json(CreateSuperAdmin);
};

export const GET = async () => {
  const response = await prisma.superAdmin.findMany({});
  return NextResponse.json(response);
};
