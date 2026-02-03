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
    <div className="bg-black text-white">
      <div
        onClick={() => {
          push(`dashboard/worker/${user?.id}`);
        }}
      >
        Worker
      </div>
      <div
        onClick={() => {
          push(`/dashboard/user/${user?.id}`);
        }}
      >
        User
      </div>
    </div>
  );
};
export default Page;
