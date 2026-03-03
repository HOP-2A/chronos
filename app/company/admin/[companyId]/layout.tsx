// app/company/admin/[companyId]/layout.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const { userId } = await auth(); // Get the Clerk ID directly

  if (!userId) {
    redirect("/sign-in");
  }

  // Check if this Admin (via clerkId) owns this specific company
  const adminAccess = await prisma.admin.findFirst({
    where: {
      clerkId: userId,
      companies: {
        some: {
          id: companyId,
        },
      },
    },
  });

  // If no access found, boot them out
  if (!adminAccess) {
    return redirect("/unauthorized");
  }

  return <>{children}</>;
}
