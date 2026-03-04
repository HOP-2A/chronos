import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: Request,
  context: { params: Promise<{ userId: string }> },
) => {
  const { userId } = await context.params;
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
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
  context: { params: Promise<{ userId: string }> },
) => {
  const { userId } = await context.params;

  if (!userId) {
    return NextResponse.json({ error: "no user id" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }

  await prisma.appointment.deleteMany({
    where: { userId },
  });

  await prisma.user.delete({
    where: { id: userId },
  });

  return NextResponse.json({ success: true });
};

export const PATCH = async (
  req: NextRequest,
  context: { params: Promise<{ userId: string }> },
) => {
  const { userId } = await context.params;

  if (!userId) {
    return NextResponse.json({ error: "no user id" }, { status: 400 });
  }
  const { name } = await req.json();

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
      },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: "cant change name" }, { status: 400 });
  }
};
