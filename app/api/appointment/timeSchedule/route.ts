import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { companyId, workerId, userId, startAt, endAt } = await req.json();

    if (!companyId || !workerId || !userId || !startAt || !endAt) {
      return NextResponse.json(
        { error: true, message: "Missing fields" },
        { status: 400 },
      );
    }

    const startDate = new Date(startAt);
    const endDate = new Date(endAt);

    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      return NextResponse.json(
        { error: true, message: "User not found" },
        { status: 400 },
      );
    }

    const workerExists = await prisma.worker.findUnique({
      where: { id: workerId },
    });
    if (!workerExists) {
      return NextResponse.json(
        { error: true, message: "Worker not found" },
        { status: 400 },
      );
    }

    const conflict = await prisma.appointment.findFirst({
      where: {
        workerId,
        status: "BOOKED",
        OR: [
          {
            startAt: { lte: startDate },
            endAt: { gt: startDate },
          },
          {
            startAt: { lt: endDate },
            endAt: { gte: endDate },
          },
        ],
      },
    });

    if (conflict) {
      return NextResponse.json(
        { error: true, message: "Slot already booked" },
        { status: 400 },
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        companyId,
        workerId,
        userId,
        startAt: startDate,
        endAt: endDate,
        status: "BOOKED",
        createdAt: new Date(),
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Appointment error:", error);
    return NextResponse.json(
      { error: true, message: "Server error" },
      { status: 500 },
    );
  }
};
