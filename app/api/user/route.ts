import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const allUsers = await prisma.user.findMany();
  return NextResponse.json(allUsers);
};
