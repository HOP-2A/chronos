// app/superAdmin/page.tsx (server)
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/db";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function Page() {
  await requireAdmin();

  const [companyCount, workerCount, userCount, scheduleCount] =
    await Promise.all([
      prisma.company.count(),
      prisma.worker.count(),
      prisma.user.count(),
      prisma.timeSchedule.count(),
    ]);

  const res = await fetch(`/api/company`);
  if (!res.ok) throw new Error("failed to fetch /api/company");
  const recentCompanies = await res.json();

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
