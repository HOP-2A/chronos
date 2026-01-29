import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    name,
    typeOfCompany,
    location,
    feedback,
    openTime,
    closeTime,
    ownerId,
  } = await req.json();

  const admin = await prisma.admin.findUnique({
    where: { id: ownerId },
  });

  if (!admin) {
    return new NextResponse("admin not found", { status: 404 });
  }

  const company = await prisma.company.create({
    data: {
      name,
      typeOfCompany,
      location,
      feedback,
      openTime,
      closeTime,
      owner: {
        connect: { id: ownerId },
      },
    },
    include: { owner: true },
  });

  return NextResponse.json(company);
}
