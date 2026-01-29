import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { day, startTime, endTime, workerId, companyId } = body;

  const existed = await prisma.timeSchedule.findFirst({
    where: {
      day,
      startTime,
      endTime,
      workerId,
      companyId,
    },
  });

  if (!existed) {
    const createNewSchedule = await prisma.timeSchedule.create({
      data: {
        day,
        startTime,
        endTime,
        worker: { connect: { id: workerId } },
        company: { connect: { id: companyId } },
      },
    });
    return NextResponse.json(createNewSchedule, { status: 201 });
  } else {
    return NextResponse.json("failed", { status: 404 });
  }
}
