import { prisma } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ companyId: string }> },
) => {
  try {
    const { companyId } = await params;

    if (!companyId) {
      return NextResponse.json(
        { error: "Company ID missing" },
        { status: 400 },
      );
    }

    const { email, name, phoneNumber, experience, password } = await req.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: "Email and Name are required" },
        { status: 400 },
      );
    }

    const existingWorker = await prisma.worker.findFirst({
      where: { email },
    });

    if (existingWorker) {
      return NextResponse.json(
        { error: "Worker already exists" },
        { status: 400 },
      );
    }

    const client = await clerkClient();

    const clerkUser = await client.users.createUser({
      emailAddress: [email],
      password,
      skipPasswordChecks: true,
      skipPasswordRequirement: true,
      publicMetadata: {
        role: "WORKER",
      },
    });

    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    const worker = await prisma.worker.create({
      data: {
        email,
        name,
        phoneNumber,
        experience,
        clerkId: clerkUser.id,
        role: "WORKER",
      },
    });

    const application = await prisma.workerApplication.create({
      data: {
        workerId: worker.id,
        companyId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        worker,
        application,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("create worker + application error:", error);

    return NextResponse.json(
      {
        error: "Failed to create worker + application",
        debug: {
          name: error?.name,
          message: error?.message,
          code: error?.code,
          clerkErrors: error?.errors,
          meta: error?.meta,
        },
      },
      { status: 500 },
    );
  }
};
