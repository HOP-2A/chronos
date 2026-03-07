// app/superAdmin/page.tsx (server)
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/db";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function Page() {
  await requireAdmin();

  // Fetch everything directly from the DB in one parallel block
  const [companyCount, workerCount, userCount, scheduleCount, recentCompanies] =
    await Promise.all([
      prisma.company.count(),
      prisma.worker.count(),
      prisma.user.count(),
      prisma.timeSchedule.count(),
      // Replace the fetch call with this:
      prisma.company.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          name: true,
          location: true,
        },
      }),
    ]);

  return (
    <AdminDashboardClient
      companyCount={companyCount}
      workerCount={workerCount}
      userCount={userCount}
      scheduleCount={scheduleCount}
      recentCompanies={recentCompanies}
    />
  );
}
