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

    /* ✅ Check user exists first */
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return NextResponse.json(
        { error: true, message: "User not found" },
        { status: 400 },
      );
    }

    /* ✅ Create appointment */
    const appointment = await prisma.appointment.create({
      data: {
        companyId,
        workerId,
        userId,
        startAt: new Date(startAt),
        endAt: new Date(endAt),
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Appointment error:", error);

    return NextResponse.json(
      {
        error: true,
        message: "Server error",
      },
      { status: 500 },
    );
  }
};
