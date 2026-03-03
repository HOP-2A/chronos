import { prisma } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";
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
    const existingWorker = prisma.worker.findFirst({
      where: {
        email,
      },
    });

    if (!existingWorker) {
      return NextResponse.json(
        { error: "Worker already exist" },
        { status: 400 },
      );
    }

    const client = await clerkClient();
    const clerkUser = await client.users.createUser({
      emailAddress: [email],
      password: password,
      skipPasswordChecks: false,
      skipPasswordRequirement: false,
      publicMetadata: { role: Role.WORKER },
    });
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    const worker = await prisma.worker.upsert({
      where: { email },
      update: { name, phoneNumber, experience },
      create: {
        email,
        name,
        phoneNumber,
        experience,
        password,
        clerkId,
        role: Role.WORKER,
      },
    });

    let application;
    try {
      application = await prisma.workerApplication.create({
        data: { workerId: worker.id, companyId },
      });
    } catch (e: any) {
      return NextResponse.json(
        { error: "application already exists for this company" },
        { status: 409 },
      );
    }

    return NextResponse.json({ worker, application });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create worker + application" },
      { status: 500 },
    );
  }
};
