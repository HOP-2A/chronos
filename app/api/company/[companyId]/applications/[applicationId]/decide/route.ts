import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Decision = "ACCEPT" | "REJECT";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ companyId: string; applicationId: string }> },
) {
  try {
    const { companyId, applicationId } = await params;
    const body = await req.json().catch(() => ({}));

    const decision = body.decision as Decision | undefined;
    const reason = typeof body.reason === "string" ? body.reason : undefined;
    const decidedById =
      typeof body.decidedById === "string" ? body.decidedById : undefined;

    if (!companyId || !applicationId) {
      return NextResponse.json(
        { error: "missing route params" },
        { status: 400 },
      );
    }

    if (decision !== "ACCEPT" && decision !== "REJECT") {
      return NextResponse.json(
        { error: 'decision must be "ACCEPT" or "REJECT"' },
        { status: 400 },
      );
    }

    if (decision === "REJECT" && reason && reason.length > 500) {
      return NextResponse.json({ error: "reason too long" }, { status: 400 });
    }

    const application = await prisma.workerApplication.findFirst({
      where: { id: applicationId, companyId },
      select: {
        id: true,
        status: true,
        workerId: true,
        worker: { select: { companyId: true } },
      },
    });

    if (!application) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    if (application.status !== "PENDING") {
      return NextResponse.json(
        { error: `already decided: ${application.status}` },
        { status: 409 },
      );
    }

    if (
      decision === "ACCEPT" &&
      application.worker.companyId &&
      application.worker.companyId !== companyId
    ) {
      return NextResponse.json(
        { error: "worker already belongs to another company" },
        { status: 409 },
      );
    }

    const now = new Date();

    if (decision === "ACCEPT") {
      const appFlip = await prisma.workerApplication.updateMany({
        where: {
          id: applicationId,
          companyId,
          status: "PENDING",
        },
        data: {
          status: "ACCEPTED",
          decidedAt: now,
          decidedById,
          reason: null,
        },
      });

      if (appFlip.count === 0) {
        return NextResponse.json(
          { error: "not found or already decided" },
          { status: 409 },
        );
      }

      const workerUpdate = await prisma.worker.updateMany({
        where: {
          id: application.workerId,
          OR: [{ companyId: null }, { companyId }],
        },
        data: { companyId },
      });

      if (workerUpdate.count === 0) {
        await prisma.workerApplication.update({
          where: { id: applicationId },
          data: {
            status: "PENDING",
            decidedAt: null,
            decidedById: null,
            reason: null,
          },
        });

        return NextResponse.json(
          { error: "worker was assigned to another company during accept" },
          { status: 409 },
        );
      }

      const updatedApp = await prisma.workerApplication.findUnique({
        where: { id: applicationId },
      });

      return NextResponse.json({ application: updatedApp });
    }

    const appFlip = await prisma.workerApplication.updateMany({
      where: {
        id: applicationId,
        companyId,
        status: "PENDING",
      },
      data: {
        status: "REJECTED",
        decidedAt: now,
        decidedById,
        reason: reason ?? null,
      },
    });

    if (appFlip.count === 0) {
      return NextResponse.json(
        { error: "not found or already decided" },
        { status: 409 },
      );
    }

    const updatedApp = await prisma.workerApplication.findUnique({
      where: { id: applicationId },
    });

    return NextResponse.json({ application: updatedApp });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "failed to decide application" },
      { status: 500 },
    );
  }
}
