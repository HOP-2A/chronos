import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Нэвтэрнэ үү" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      typeOfCompany,
      location,
      feedback,
      openTime,
      closeTime,
      image,
    } = body;

    const company = await prisma.company.create({
      data: {
        name,
        typeOfCompany,
        location,
        feedback,
        openTime,
        closeTime,
        image,
        admin: {
          connectOrCreate: {
            where: { clerkId: user.id },
            create: {
              clerkId: user.id,
              name:
                `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() ||
                "Admin",
              email: user.emailAddresses[0].emailAddress,
            },
          },
        },
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.error("Company Creation Error:", error);
    return NextResponse.json(
      { error: "Компани үүсгэхэд алдаа гарлаа" },
      { status: 500 },
    );
  }
}

export const GET = async () => {
  const companies = await prisma.company.findMany({
    include: { admin: true },
  });
  return NextResponse.json(companies);
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { companyId } = await req.json();
    const user = await currentUser();

    const existingCompany = await prisma.company.findUnique({
      where: { id: companyId },
      include: { admin: true },
    });

    if (!existingCompany) {
      return NextResponse.json({ error: "Компани олдсонгүй" }, { status: 404 });
    }

    if (existingCompany.admin?.clerkId !== user?.id) {
      return NextResponse.json(
        { error: "Устгах эрх байхгүй байна" },
        { status: 403 },
      );
    }

    const deleteCom = await prisma.company.delete({
      where: { id: companyId },
    });

    return NextResponse.json({ message: "Амжилттай устгагдлаа", deleteCom });
  } catch (error) {
    return NextResponse.json(
      { error: "Устгахад алдаа гарлаа" },
      { status: 500 },
    );
  }
};
