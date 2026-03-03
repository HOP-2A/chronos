// import { prisma } from "@/lib/db";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const { userId, workerId, description, startAt, endAt } = await req.json();

//   const worker = await prisma.worker.findUnique({
//     where: { id: workerId },
//   });

//   if (!worker || !worker.companyId) {
//     return NextResponse.json(
//       { error: "Worker or company NOT FOUND 404" },
//       { status: 404 },
//     );
//   }

//   const newAppointment = await prisma.appointment.create({
//     data: {
//       description,
//       userId,
//       workerId,
//       companyId: worker.companyId,
//       startAt: new Date(startAt),
//       endAt: new Date(endAt),
//     },
//   });

//   return NextResponse.json(newAppointment, { status: 201 });
// }
