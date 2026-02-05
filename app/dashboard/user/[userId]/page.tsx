"use client";

import Sidebar from "@/app/_component/sidebar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  clerkId: string;
  companyId: string;
};
type CompanyType = {
  closeTime: string;
  createdAt: Date;
  feedback: string;
  id: string;
  location: string;
  name: string;
  openTime: string;
  typeOfCompany: string;
};

const Page = () => {
  const params = useParams();
  const userId = params.userId;
  const [getUser, setGetUser] = useState<UserType>();
  const [company, setCompany] = useState<CompanyType>();
  const [worker, setWorker] = useState();

  const workerGet = async () => {
    const response = await fetch("/api/worker");
    const res = await response.json();
    setWorker(res);
  };

  const companyGet = async () => {
    const response = await fetch("/api/company");
    const res = await response.json();
    setCompany(res);
  };
  console.log(company);

  useEffect(() => {
    const userGet = async () => {
      const response = await fetch(`/api/user/${userId}`);
      const res = await response.json();
      setGetUser(res);
    };
    userGet();
    companyGet();
    workerGet();
  }, []);
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <main className="flex-1 p-10 text-white">
        <h1 className="text-3xl font-bold mb-6">Welcome! User</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2">Account Info</h3>
            <p className="text-zinc-400">User ID: {params.userId}</p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2">Activity</h3>
            <p className="text-zinc-400">No recent activity</p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Page;
