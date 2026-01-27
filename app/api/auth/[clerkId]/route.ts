import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ clerkId: string }> },
) {
  try {
    const { clerkId } = await context.params;

    const customer = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    console.error("GET customer error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
