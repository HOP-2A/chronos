import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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
