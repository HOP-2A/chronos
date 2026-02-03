import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { workerId } = await req.json();

  if (workerId) {
    const workerSchedule = await prisma.timeSchedule.findMany({
      where: { workerId },
    });
    return NextResponse.json(workerSchedule);
  } else {
    return NextResponse.json("your backend is failed", { status: 404 });
  }
}
