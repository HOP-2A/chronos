"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Clock,
  MapPin,
  ArrowUpRight,
  Building2,
  Sparkles,
  Globe,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-[#020203] text-zinc-100 selection:bg-fuchsia-500/30 overflow-x-hidden">
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 rounded-full border border-white/10 bg-black/40 backdrop-blur-2xl px-6 py-3 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-7 h-7 bg-fuchsia-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(192,38,211,0.5)] group-hover:rotate-90 transition-transform duration-500">
            <Clock size={14} className="text-white" />
          </div>
          <span className="font-bold tracking-tighter text-lg uppercase italic">
            Chronos
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          <div
            onClick={() => push("/dashboard/worker/workerCompanies")}
            className="hover:text-fuchsia-400 transition-colors cursor-pointer"
          >
            компаниуд
          </div>
          <a href="#" className="hover:text-fuchsia-400 transition-colors">
            бидний тухай
          </a>
        </div>
        <Button
          onClick={() => push("/createCompany")}
          className="rounded-full bg-fuchsia-500 text-white hover:bg-indigo-400 px-6 h-9 text-xs font-bold transition-all duration-300"
        >
          КОМПАНИ ҮҮСГЭХ
        </Button>
      </nav>

      <header className="relative pt-48 pb-16 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-fuchsia-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Sparkles size={12} className="text-fuchsia-500" /> Сүлжээнд нэгдсэн
          </div>
          <h1 className="text-5xl md:text-7xl font-serif italic leading-tight tracking-tight text-white">
            Манай Компаниуд
          </h1>
          <p className="text-zinc-500 text-base max-w-lg mx-auto font-medium">
            Хамгийн шилдэг үйлчилгээ үзүүлэгч нарыг нэг дороос олж, цаг
            захиалгаа баталгаажуул.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <CompanySkeleton key={i} />
              ))
            : companies.map((com) => (
                <div
                  onClick={() =>
                    push(`/dashboard/worker/createWorker/${com.id}`)
                  }
                  key={com.id}
                  className="group relative p-8 rounded-[2.5rem] border border-white/5 bg-zinc-950/30 hover:bg-white/[0.02] hover:border-fuchsia-500/30 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-fuchsia-600/5 blur-3xl group-hover:bg-fuchsia-600/10 transition-all" />

                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Building2 className="text-fuchsia-500" size={28} />
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-[10px] font-black text-fuchsia-500 uppercase tracking-[0.2em] mb-1">
                      {com.typeOfCompany}
                    </p>
                    <h2 className="text-2xl font-bold uppercase italic leading-tight tracking-tight text-white group-hover:text-fuchsia-500 transition-colors">
                      {com.name}
                    </h2>
                  </div>

                  <div className="space-y-5 mb-10">
                    <div className="flex items-center gap-3 text-zinc-400">
                      <MapPin size={16} className="text-zinc-600" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        {com.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400">
                      <Clock size={16} className="text-zinc-600" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        {com.openTime} — {com.closeTime}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </main>

      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xs font-bold text-zinc-600 uppercase tracking-[0.3em]">
            ©2026 Chronos XXK
          </div>
          <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
            <Globe size={12} className="text-fuchsia-500" /> pinecone academy
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
