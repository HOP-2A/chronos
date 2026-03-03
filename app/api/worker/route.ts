import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { endTime, startTime, day, workerId, slotInterval } = await req.json();

  if (!workerId) {
    return NextResponse.json({ error: "WorkerId needed" }, { status: 400 });
  }

  const worker = await prisma.worker.findUnique({
    where: { id: workerId },
  });

  if (!worker) {
    return NextResponse.json({ error: "Worker not found" }, { status: 404 });
  }

  const existed = await prisma.timeSchedule.findFirst({
    where: {
      workerId,
      day,
      startTime,
      endTime,
    },
  });

  if (existed) {
    return NextResponse.json(
      { error: "Schedule already exists" },
      { status: 409 },
    );
  }

  const schedule = await prisma.timeSchedule.create({
    data: {
      day,
      startTime,
      endTime,
      slotInterval: slotInterval || 60,
      workerId,
      companyId: worker.companyId,
    },
  });

  return NextResponse.json(schedule, { status: 201 });
}

export async function GET() {
  const schedules = await prisma.timeSchedule.findMany();
  return NextResponse.json(schedules);
}
