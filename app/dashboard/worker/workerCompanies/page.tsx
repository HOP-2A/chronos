"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type companyType = {
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
  const [company, setCompany] = useState<companyType[]>([]);
  const { push } = useRouter();
  const allCompanyGet = async () => {
    const res = await fetch("/api/company");
    const data = await res.json();
    setCompany(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    allCompanyGet();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-semibold text-center mb-10">Companies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {company.map((com) => (
          <div
            key={com.id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 transition cursor-pointer"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{com.name}</h2>
              <p className="text-sm text-gray-400">{com.typeOfCompany}</p>
            </div>
            <div className="text-sm text-gray-300 space-y-1">
              <p>📍 {com.location}</p>
              <p>
                ⏰ {com.openTime} - {com.closeTime}
              </p>
            </div>
            <button
              onClick={() => {
                push(`/dashboard/worker/createWorker/${com.id}`);
              }}
              className="w-full mt-6 py-3 rounded-xl  bg-black text-white font-medium hover:bg-gray-800 transition"
            >
              Enter
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
