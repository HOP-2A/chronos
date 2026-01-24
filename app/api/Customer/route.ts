import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { name, email, clerkId } = body;
  console.log(name, email, clerkId);

  const a = await prisma.customer.create({
    data: {
      email,
      name,
      clerkId,
    },
  });

  return NextResponse.json(a);
};
