"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Toaster } from "sonner";
import {
  ArrowUpRight,
  Clock,
  Sparkles,
  MapPin,
  Building2,
  LayoutGrid,
} from "lucide-react";

export type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  clerkId: string;
  companyId: string;
};

export type CompanyType = {
  closeTime: string;
  createdAt: Date;
  feedback: string;
  id: string;
  location: string;
  name: string;
  openTime: string;
  typeOfCompany: string;
  image: string;
};

const UserPanel = () => {
  const params = useParams();
  const userId = params.userId;
  const { push } = useRouter();

  const [getUser, setGetUser] = useState<UserType[]>([]);
  const [company, setCompany] = useState<CompanyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [userRes, companyRes] = await Promise.all([
          fetch(`/api/user/${userId}`),
          fetch("/api/company"),
        ]);

        const userData = await userRes.json();
        const companyData = await companyRes.json();

        setGetUser(Array.isArray(userData) ? userData : [userData]);
        setCompany(companyData);
      } catch (error) {
        console.error("Data fetch failed", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (userId) fetchData();
  }, [userId]);

  return (
    <div className="min-h-screen bg-[#020203] text-white font-sans selection:bg-fuchsia-500/30">
      <Toaster theme="dark" position="top-center" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-fuchsia-600/5 to-transparent" />
      </div>

      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-black/80 backdrop-blur-md px-8 py-4 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => push("/")}
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-fuchsia-600 to-purple-600 text-white rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-180 shadow-[0_0_20px_rgba(192,38,211,0.3)]">
            <Clock size={16} strokeWidth={3} />
          </div>

          <span className="text-lg font-black tracking-[0.2em] text-white uppercase">
            Chronos
          </span>
        </div>

        <button
          className="px-6 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-fuchsia-500 hover:text-white transition-all active:scale-[0.98]"
          onClick={() => push("/createCompany")}
        >
          БАЙГУУЛЛАГА YYСГЭХ
        </button>
      </nav>

      <main className="relative z-10 pt-40 pb-24 max-w-7xl mx-auto px-6">
        <header className="max-w-3xl mb-20 space-y-4">
          <div className="flex items-center gap-2 text-fuchsia-500 text-[10px] font-black uppercase tracking-[0.3em]">
            <Sparkles size={12} /> Network Infrastructure
          </div>
          <h1 className="text-9xl md:text-8xl font-black  uppercase ">
            Компаниас
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-400 to-indigo-500">
              цаг захиалах
            </span>
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : company.map((item) => (
                <div
                  key={item.id}
                  onClick={() => push(`/company/companyDetails/${item.id}`)}
                  className="group relative bg-zinc-900/20 border border-white/[0.05] hover:border-white/20 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900 border-b border-white/[0.05]">
                    {item.image ? (
                      <img
                        className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building2 size={24} className="text-zinc-800" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-fuchsia-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 right-4 translate-x-2 -translate-y-2 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                      <div className="bg-white p-2">
                        <ArrowUpRight size={16} className="text-black" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div>
                      <span className="text-[9px] font-black text-fuchsia-500 uppercase tracking-[0.2em]">
                        {item.typeOfCompany || "Industry Service"}
                      </span>
                      <h3 className="text-2xl font-bold text-white uppercase tracking-tight mt-1">
                        {item.name}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-3 pt-4 border-t border-white/[0.05]">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-zinc-600">Location</span>
                        <span className="text-zinc-300 truncate max-w-[150px]">
                          {item.location}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono tracking-tighter">
                        <span className="text-zinc-600 uppercase font-sans font-bold tracking-widest">
                          Hours
                        </span>
                        <span className="text-fuchsia-400 bg-fuchsia-500/5 px-2 py-0.5 border border-fuchsia-500/20">
                          {item.openTime} — {item.closeTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </main>

      <footer className="py-16 px-8 border-t border-white/[0.05] bg-black/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em]">
              ©2026 Chronos
            </div>
            <div className="w-1 h-1 bg-zinc-800 rounded-full" />
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em]">
              Node: Stable
            </div>
          </div>
          <LayoutGrid size={16} className="text-zinc-800" />
        </div>
      </footer>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-zinc-900/20 border border-white/5 animate-pulse">
    <div className="aspect-[16/10] w-full bg-zinc-900" />
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <div className="h-2 w-1/4 bg-zinc-800" />
        <div className="h-8 w-3/4 bg-zinc-800" />
      </div>
      <div className="pt-4 border-t border-white/5 space-y-3">
        <div className="h-3 w-full bg-zinc-800" />
        <div className="h-3 w-full bg-zinc-800" />
      </div>
    </div>
  </div>
);

export default UserPanel;
