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
  const allCompanies = await prisma.company.findMany({});
  return NextResponse.json(allCompanies);
}
export const DELETE = async (req: NextRequest) => {
  const { companyId } = await req.json();
  const findCompanyId = await prisma.company.findUnique({
    where: { id: companyId },
  });
  if (!findCompanyId) {
    return NextResponse.json(
      { error: "company Id oldsongu id shalgaj uzeerei" },
      { status: 404 },
    );
  } else {
    const deleteCom = await prisma.company.delete({
      where: { id: companyId },
    });
    return NextResponse.json(deleteCom);
  }
};    
