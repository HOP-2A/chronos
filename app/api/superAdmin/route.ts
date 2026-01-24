import prisma from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, clerkId } = await req.json();
  const CreateSuperAdmin = await prisma.superAdmin.create({
    data: { email, clerkid: clerkId },
  });
  return NextResponse.json(CreateSuperAdmin);
};

export const GET = async () => {
  const response = await prisma.superAdmin.findMany({});
  return NextResponse.json(response);
};
