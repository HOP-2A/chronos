"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Clock,
  MapPin,
  Building2,
  Sparkles,
  Globe,
  ArrowUpRight,
} from "lucide-react";
<<<<<<< HEAD
import { Button } from "@/components/ui/button";
=======
>>>>>>> 487fa10b45f3a163666cb83014ca29bafca7b1d7
import ChronosHeaderBar from "@/app/_component/ChronosHeaderBar";

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

const CompaniesPage = () => {
  const [companies, setCompanies] = useState<companyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { push } = useRouter();

  const allCompanyGet = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/company");
      const data = await res.json();
      setCompanies(data);
    } catch (error) {
      console.error("Failed to fetch companies", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    allCompanyGet();
  }, []);

  return (
    <div className="min-h-screen bg-[#020203] text-gray-100 font-sans selection:bg-fuchsia-500/30 overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full" />
      </div>
      <ChronosHeaderBar />

      <header className="relative pt-48 pb-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto w-full space-y-8">
          <div className="inline-flex items-center gap-3">
            <Sparkles size={14} className="text-fuchsia-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-fuchsia-500">
              Нэгдсэн Сүлжээ
            </span>
          </div>
          <h1 className="text-6xl sm:text-8xl lg:text-[8rem] font-black tracking-tighter leading-[0.82] text-white italic">
            МАНАЙ <br />
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-400 to-indigo-500">
              КОМПАНИУД
            </span>
          </h1>
          <div className="max-w-xl border-l border-fuchsia-500/30 pl-8 py-2">
            <p className="text-lg text-gray-400 font-light leading-relaxed">
              Шилдэг үйлчилгээ үзүүлэгчдийг нэг дороос олж,{" "}
              <span className="text-fuchsia-400 font-medium">
                Chronos дэд бүтцийн
              </span>{" "}
              тусламжтайгаар цагаа баталгаажуул.
            </p>
          </div>
        </div>
      </header>

      <main className="px-6 sm:px-12 lg:px-24 pb-32">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-end border-b border-white/[0.05] pb-8 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-white">
              Идэвхтэй байгууллагууд
            </h2>
            <span className="text-[10px] font-mono text-fuchsia-500 uppercase tracking-widest">
              {isLoading ? "LOADING" : `${companies.length} БYРТГЭГДСЭН`}
            </span>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05] border border-white/[0.05]">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-[#020203] p-px">
                    <CompanySkeleton />
                  </div>
                ))
              : companies.map((com) => (
                  <div
                    key={com.id}
                    onClick={() =>
                      push(`/dashboard/worker/createWorker/${com.id}`)
                    }
                    className="p-10 group transition-all relative overflow-hidden bg-[#020203] hover:bg-white/[0.02] cursor-pointer"
                  >
                    <div className="absolute top-0 left-0 w-full h-px transition-all duration-700 bg-fuchsia-500/0 group-hover:bg-fuchsia-500/50" />

                    <div className="flex justify-between items-start mb-12">
                      <div className="w-14 h-14 rounded-full border border-white/10 bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                        <Building2 size={24} className="text-fuchsia-500" />
                      </div>
                      <div className="p-2 bg-white/5 rounded-full text-white/20 group-hover:text-fuchsia-500 group-hover:rotate-45 transition-all">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>

                    <div className="mb-12">
                      <p className="text-[9px] text-fuchsia-500 font-bold uppercase tracking-[0.3em] mb-2">
                        {com.typeOfCompany}
                      </p>
                      <h4 className="text-3xl font-bold tracking-tighter text-white uppercase group-hover:text-fuchsia-400 transition-colors italic">
                        {com.name}
                      </h4>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-cent gap-3">
                        <MapPin size={14} className="text-gray-600" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                          {com.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock size={14} className="text-gray-600" />
                        <span className="text-[10px] font-mono text-gray-400">
                          {com.openTime} — {com.closeTime}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </main>

      <footer className="px-6 sm:px-12 lg:px-24 py-16 border-t border-white/[0.05] bg-black">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-8 text-gray-600">
          <div className="text-[9px] font-bold uppercase tracking-[0.5em]">
            ©2026 CHRONOS • ТӨСӨЛ
          </div>
          <div className="flex items-center gap-3">
            <Globe size={12} className="text-fuchsia-500" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em]">
              PINECONE ACADEMY
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const CompanySkeleton = () => (
  <div className="p-8 rounded-[2.5rem] border border-white/5 bg-zinc-950/30 animate-pulse">
    <div className="flex justify-between items-start mb-8">
      <div className="w-14 h-14 rounded-2xl bg-white/5" />
      <div className="w-10 h-10 rounded-full bg-white/5" />
    </div>

    <div className="mb-8 space-y-3">
      <div className="h-2 w-20 bg-fuchsia-500/20 rounded-full" />
      <div className="h-8 w-48 bg-white/5 rounded-lg" />
    </div>

    <div className="space-y-4 mb-10">
      <div className="h-3 w-32 bg-white/5 rounded-full" />
      <div className="h-3 w-40 bg-white/5 rounded-full" />
    </div>

    <div className="h-14 w-full bg-white/5 rounded-2xl" />
  </div>
);

export default CompaniesPage;
