import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ workerId: string }> },
) => {
  try {
    const params = await context.params;
    const workerId = params.workerId;

    if (!workerId) {
      return NextResponse.json(
        { error: true, message: "Missing workerId" },
        { status: 400 },
      );
    }

    const appointments = await prisma.appointment.findMany({
      where: { workerId },
      orderBy: { startAt: "asc" },
    });

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: true, message: "Server error" },
      { status: 500 },
    );
  }
};
