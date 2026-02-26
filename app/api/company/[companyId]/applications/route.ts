import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ companyId: string }> },
) {
  try {
    const { companyId } = await params;
    const url = new URL(req.url);
    const status = (url.searchParams.get("status") ?? "PENDING") as
      | "PENDING"
      | "ACCEPTED"
      | "REJECTED";

    const applications = await prisma.workerApplication.findMany({
      where: { companyId, status },
      orderBy: { createdAt: "desc" },
      include: {
        worker: {
          select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            experience: true,
            companyId: true,
          },
        },
      },
    });

    return NextResponse.json({ applications });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "failed to fetch applications" },
      { status: 500 },
    );
  }
}
