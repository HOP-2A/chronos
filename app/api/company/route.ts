import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, typeOfCompany, location, feedback, openTime, closeTime } =
    await req.json();
  const createdCompany = await prisma.company.create({
    data: {
      name,
      typeOfCompany,
      location,
      feedback,
      openTime,
      closeTime,
    },
  });
  return NextResponse.json(createdCompany);
}

export async function GET() {
  const allCompanies = await prisma.company.findMany();
  return NextResponse.json(allCompanies);
}
