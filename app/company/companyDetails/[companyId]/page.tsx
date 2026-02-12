"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type companyDetails = {
  id: string;
  name: string;
  typeOfCompany: string;
  location: string;
  openTime: string;
  closeTime: string;
  feedback: string;
  image: string;
  createdAt: string;
};

export default function Page() {
  const params = useParams();
  const companyId = String(params.companyId);
  const [companyInfo, setCompanyInfo] = useState<companyDetails | null>(null);

  const fetchCompanyInfo = async () => {
    const response = await fetch(`/api/company/getCompanyInfo/${companyId}`);
    const res = await response.json();
    setCompanyInfo(res);
  };
  console.log(companyInfo);
  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-gray-100 font-sans flex flex-col">
      {companyInfo?.image && (
        <div className="h-[40vh] sm:h-[50vh] w-full relative">
          <img
            src={companyInfo.image}
            alt={companyInfo.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
        </div>
      )}
      <div className="flex-1 px-6 py-10 sm:px-12 lg:px-24 max-w-7xl mx-auto w-full">
        <header className="mb-12">
          <div className="mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              {companyInfo?.typeOfCompany}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tighter text-white mb-4">
            {companyInfo?.name}
          </h1>
          <div className="flex items-center gap-4 text-gray-500">
            <p className="text-lg flex items-center gap-2">
              <span className="text-white/40">📍</span> {companyInfo?.location}
            </p>
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 border-t border-white/[0.05] pt-12">
          <div className="space-y-8">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-3">
                Operational Hours
              </label>
              <div className="flex gap-8">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase mb-1">
                    Open
                  </p>
                  <p className="text-2xl font-light text-white">
                    {companyInfo?.openTime
                      ? new Date(companyInfo.openTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase mb-1">
                    Close
                  </p>
                  <p className="text-2xl font-light text-white">
                    {companyInfo?.closeTime
                      ? new Date(companyInfo.closeTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-3">
              Public Sentiment
            </label>
            <p className="text-2xl font-light text-gray-300 italic">
              {companyInfo?.feedback || "no feedbacks yet"}
            </p>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-3">
              Registry Date
            </label>
            <p className="text-2xl font-light text-gray-300">
              {companyInfo?.createdAt
                ? new Date(companyInfo.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "—"}
            </p>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 w-full p-6 bg-[#0A0A0A]/80 backdrop-blur-md border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto flex justify-end">
          <button className="w-full sm:w-auto px-12 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-all active:scale-[0.98]">
            Manage Organization
          </button>
        </div>
      </div>
    </div>
  );
}
