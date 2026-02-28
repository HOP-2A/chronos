import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

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
