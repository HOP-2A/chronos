"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export type UserType = {
  id: String;
  name: string;
  email: string;
  role: string;
  clerkId: string;
  companyId: string;
};
const Page = () => {
  const { push } = useRouter();
  const { user } = useUser();
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex gap-16">
        <div
          onClick={() => push(`/dashboard/worker/workerCompanies/${user?.id}`)}
          className="
        w-44 h-28 rounded-xl border-2 border-white flex items-center justify-center text-white cursor-pointer hover:border-purple-400 hover:shadow-[0_0_30px_#a855f7] transition-all duration-300 ease-out
      "
        >
          Worker
        </div>
        <div
          onClick={() => push(`/dashboard/user/${user?.id}`)}
          className="
        w-44 h-28 rounded-xl border-2 border-white flex items-center justify-center text-white cursor-pointer hover:border-purple-400 hover:shadow-[0_0_30px_#a855f7] transition-all duration-300 ease-out
      "
        >
          User
        </div>
      </div>
    </div>
  );
};
export default Page;
