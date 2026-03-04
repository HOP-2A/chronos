import { prisma } from "@/lib/db";
import { Role, WorkerRequestStatus } from "@prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: Request,
  context: { params: Promise<{ workerId: string }> },
) => {
  const { workerId } = await context.params;
  try {
    const user = await prisma.worker.findUnique({
      where: { id: workerId },
      include: {
        applications: true,
        timeSchedules: true,
      },
    });

    if (!user) {
      return NextResponse.json("user not found");
    }
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json("server error");
  }
};

export const DELETE = async (
  req: NextRequest,
  context: { params: Promise<{ workerId: string }> },
) => {
  const { workerId } = await context.params;

  console.log("workerId:", workerId);

  if (!workerId) {
    return NextResponse.json({ error: "no worker" }, { status: 400 });
  }

  const worker = await prisma.worker.findUnique({
    where: { id: workerId },
    include: { applications: true },
  });

  if (!worker) {
    return NextResponse.json({ error: "worker not found" }, { status: 404 });
  }

  const hasValidStatus = worker.applications.some(
    (app) =>
      app.status === WorkerRequestStatus.ACCEPTED ||
      app.status === WorkerRequestStatus.REJECTED,
  );

  if (!hasValidStatus) {
    return NextResponse.json(
      { error: "worker application still pending" },
      { status: 400 },
    );
  }

  await prisma.appointment.deleteMany({ where: { workerId } });
  await prisma.timeSchedule.deleteMany({ where: { workerId } });
  await prisma.workerApplication.deleteMany({ where: { workerId } });

  await prisma.worker.delete({
    where: { id: workerId },
  });

  return NextResponse.json({ success: true });
};

export const PATCH = async (
  req: NextRequest,
  context: { params: Promise<{ workerId: string }> },
) => {
  const { workerId } = await context.params;

  if (!workerId) {
    return NextResponse.json({ error: "no worker id" }, { status: 400 });
  }
  const { name, email, phoneNumber, experience, profilePicture, companyId } =
    await req.json();

  const worker = await prisma.worker.findUnique({
    where: { id: workerId },
  });

  if (!worker) {
    return NextResponse.json({ error: "worker not found" }, { status: 404 });
  }

  try {
    const updatedWorker = await prisma.worker.update({
      where: { id: workerId },
      data: {
        name,
        email,
        phoneNumber,
        experience,
        profilePicture,
      },
    });

    return NextResponse.json({ success: true, worker: updatedWorker });
  } catch (error) {
    return NextResponse.json(
      { error: "update failed (maybe email already exists)" },
      { status: 400 },
    );
  }
};
