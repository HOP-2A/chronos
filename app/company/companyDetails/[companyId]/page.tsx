"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type CompanyDetails = {
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
  const { push } = useRouter();
  const params = useParams();
  const companyId = String(params.companyId);
  const [companyInfo, setCompanyInfo] = useState<CompanyDetails | null>(null);
  const [companyWorkers, setCompanyWorkers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCompanyInfo = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/company/getCompanyInfo/${companyId}`);
    const res = await response.json();
    setCompanyInfo(res);
    setIsLoading(false);
  };

  const fetchCompanyWorkers = async () => {
    const response = await fetch(
      `/api/worker/getWorkersByCompanyId/${companyId}`,
    );
    const res = await response.json();
    setCompanyWorkers(res);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchCompanyInfo();
      await fetchCompanyWorkers();
      setIsLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-gray-100 font-sans flex flex-col">
      {isLoading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50 flex items-center justify-center">
          <div className="text-white text-sm tracking-widest animate-pulse">
            LOADING
          </div>
        </div>
      )}
      {companyInfo?.image && (
        <div className="h-[40vh] sm:h-[50vh] w-full relative">
          <img
            src={companyInfo.image}
            alt={companyInfo.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
        </div>
      )}

      <div className="flex-1 px-6 py-10 sm:px-12 lg:px-24 max-w-7xl mx-auto w-full space-y-24">
        <header>
          <div className="mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              {companyInfo?.typeOfCompany}
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-semibold tracking-tighter text-white mb-6">
            {companyInfo?.name}
          </h1>
          <p className="text-xl text-gray-400 flex items-center gap-2">
            <span className="opacity-50">📍</span> {companyInfo?.location}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/[0.05] pt-12">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
              Ажлын цаг
            </label>
            <p className="text-2xl font-light text-white">
              {companyInfo?.openTime
                ? new Date(companyInfo.openTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "—"}
              <span className="text-gray-700 mx-2">/</span>
              {companyInfo?.closeTime
                ? new Date(companyInfo.closeTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "—"}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
              Сэтгэгдэл
            </label>
            <p className="text-2xl font-light text-gray-300 italic">
              "{companyInfo?.feedback || "Одоогоор сэтгэгдэл байхгүй"}"
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
              Байгуулагдсан
            </label>
            <p className="text-2xl font-light text-gray-300">
              {companyInfo?.createdAt
                ? new Date(companyInfo.createdAt).toLocaleDateString("mn-MN", {
                    year: "numeric",
                    month: "long",
                  })
                : "—"}
            </p>
          </div>
        </div>

        <section className="pb-20">
          <div className="flex items-center justify-between mb-10 border-b border-white/[0.05] pb-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-white">
              Идэвхтэй багийн гишүүд
            </h2>
            <span className="text-[10px] font-mono text-gray-600">
              {companyWorkers.length} нийт
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05] border border-white/[0.05]">
            {companyWorkers.map((worker) => (
              <div
                key={worker.id}
                className="bg-[#0A0A0A] p-6 hover:bg-white/[0.02] transition-colors group"
                onClick={() =>
                  push(`/dashboard/worker/workerOrder/${worker.id}`)
                }
              >
                <p className="text-sm font-medium text-white mb-1 group-hover:text-emerald-400 transition-colors">
                  {worker.name}
                </p>
                <p className="text-xs text-gray-500 font-mono tracking-tighter">
                  {worker.experience}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
