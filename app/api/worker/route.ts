import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const worker = await prisma.worker.findUnique({
    where: { id: body.workerId },
  });

  if (!worker) {
    return NextResponse.json({ error: "Worker not found" }, { status: 404 });
  }

  const existed = await prisma.timeSchedule.findFirst({
    where: {
      endTime: body.endTime,
      startTime: body.startTime,
      day: body.day,
      workerId: body.workerId,
    },
  });

  if (!existed) {
    const createNewSchedule = await prisma.timeSchedule.create({
      data: {
        endTime: body.endTime,
        startTime: body.startTime,
        workerId: body.workerId,
        day: body.day,
        companyId: worker.companyId,
      },
    });

    return NextResponse.json(createNewSchedule, { status: 201 });
  } else {
    return NextResponse.json("failed", { status: 404 });
  }
}
