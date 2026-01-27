import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, typeOfCompany, location } = await req.json();
  const createdCompany = prisma.company.create({
    data: {
      name,
      typeOfCompany,
      location,
    },
  });
  return NextResponse.json(createdCompany);
}

export async function GET() {
  const allTrips = prisma.company.findMany();
  return NextResponse.json(allTrips);
}
