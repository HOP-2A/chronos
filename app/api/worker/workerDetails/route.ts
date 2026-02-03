import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, name, phoneNumber } = body;
  const createWorker = await prisma.worker.create({
    data: {
      email,
      name,
      phoneNumber,
      
    },
  });
}
