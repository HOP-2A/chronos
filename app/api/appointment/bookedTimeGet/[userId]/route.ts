import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) => {
  try {
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }
    const appointments = await prisma.appointment.findMany({
      where: {
        userId,
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            location: true,
            image: true,
            openTime: true,
            closeTime: true,
            typeOfCompany: true,
          },
        },
      },
      orderBy: {
        startAt: "desc",
      },
    });
    console.log(appointments, "asjdklasjdklas");
    return NextResponse.json(appointments);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 },
    );
  }
};
