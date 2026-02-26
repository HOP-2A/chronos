import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ companyId: string }> },
) => {
  try {
    // ✅ Await params because it is a Promise
    const { companyId } = await params;

    if (!companyId) {
      return NextResponse.json(
        { error: "Company ID missing" },
        { status: 400 },
      );
    }

    const { email, name, phoneNumber, experience } = await req.json();

    // 1️⃣ Check company
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // 2️⃣ Create worker
    const worker = await prisma.worker.create({
      data: {
        email,
        name,
        phoneNumber,
        experience,
      },
    });

    // 3️⃣ Create application
    const application = await prisma.workerApplication.create({
      data: {
        workerId: worker.id,
        companyId: companyId,
      },
    });

    return NextResponse.json({ worker, application });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create worker + application" },
      { status: 500 },
    );
  }
};
