import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { endTime, startTime, day, workerId } = await req.json();

  const worker = await prisma.worker.findUnique({
    where: { id: workerId },
  });

  if (!worker) {
    return NextResponse.json({ error: "Worker not found" }, { status: 404 });
  }

  const existed = await prisma.timeSchedule.findFirst({
    where: {
      endTime,
      startTime,
      day,
      workerId,
    },
  });

  if (!existed) {
    const createNewSchedule = await prisma.timeSchedule.create({
      data: {
        endTime,
        startTime,
        workerId,
        day,
        companyId: worker.companyId,
      },
    });

    return NextResponse.json(createNewSchedule, { status: 201 });
  } else {
    return NextResponse.json("failed", { status: 404 });
  }
}

export const GET = async () => {
  const allworkers = await prisma.worker.findMany();
  return NextResponse.json(allworkers);
};
