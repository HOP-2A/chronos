"use client";

import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  clerkId: string;
  companyId: string;
};

const Page = () => {
  const { user } = useUser();
  const params = useParams();
  const userId = params.userId;
  const [getUser, setGetUser] = useState<UserType | null>(null);

  console.log(getUser);

  useEffect(() => {
    const userGet = async () => {
      const response = await fetch(`/api/user/${userId}`);
      const res = await response.json();
      setGetUser(res);
    };
    userGet();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] p-4 sm:p-6 text-gray-100">
      <div className="w-full max-w-md bg-[#111111] p-6 sm:p-8 rounded-xl border border-white/[0.05] shadow-2xl">
        <header className="mb-6 sm:mb-8 border-b border-white/[0.05] pb-6">
          <h1 className="text-xl font-medium tracking-tight text-white">
            Worker Profile
          </h1>
          <p className="text-sm text-gray-500 mt-1">System record overview</p>
        </header>
        <div className="space-y-6">
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-6 xs:gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">
                Name
              </label>
              <p className="text-sm font-medium text-gray-200 break-words">
                {getUser?.name || "—"}
              </p>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">
                Role
              </label>
              <div>
                <span className="inline-block px-2 py-0.5 text-[11px] font-medium bg-white/[0.03] text-gray-400 rounded border border-white/[0.05]">
                  {getUser?.role || "Standard"}
                </span>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">
              Email Address
            </label>
            <p className="text-sm text-gray-400 break-all sm:break-normal">
              {getUser?.email}
            </p>
          </div>
          <div className="pt-4 border-t border-white/[0.05] space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">
                Database ID
              </label>
              <div className="group relative">
                <code className="block text-[10px] sm:text-[11px] font-mono text-gray-500 bg-white/[0.02] px-3 py-2 rounded border border-white/[0.03] overflow-x-auto whitespace-pre-wrap break-all sm:whitespace-nowrap select-all">
                  {getUser?.id}
                </code>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/[0.05]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-600 uppercase tracking-widest">
              Status
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
