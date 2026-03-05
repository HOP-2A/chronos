import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { companyId, workerId, userId, startAt, endAt } = await req.json();
  if (!companyId && !userId && !workerId) {
    return NextResponse.json({
      error: true,
      message: " companyId, workerId, userId nuud alga olj ir",
    });
  } else {
    const UserGetAppointment = await prisma.appointment.create({
      data: {
        companyId,
        userId,
        workerId,
        startAt,
        endAt,
      },
    });

    return NextResponse.json(UserGetAppointment);
  }
};
