import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const allusers = await prisma.user.findMany({
      include: {
        appointments: true,
      },
    });

    return NextResponse.json(allusers);
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
