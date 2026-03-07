"use client";

import React, { useState, useEffect, use } from "react";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Fingerprint,
  Zap,
  Users,
  MessageSquare,
  Loader2,
  ChevronRight,
  Globe,
} from "lucide-react";
import Link from "next/link";

type CompanyDetails = {
  id: string;
  name: string;
  typeOfCompany: string;
  location: string;
  openTime: string; // Changed to string
  closeTime: string; // Changed to string
  feedback: string;
  image: string;
  createdAt: string;
};

type Worker = {
  id: string;
  name: string;
  experience: string;
};

export default function CompanyDetail({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const resolvedParams = use(params);
  const companyId = resolvedParams?.companyId;

  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        const [compRes, workRes] = await Promise.all([
          fetch(`/api/company/getCompanyInfo/${companyId}`),
          fetch(`/api/worker/getWorkersByCompanyId/${companyId}`),
        ]);

        if (compRes.ok) setCompany(await compRes.json());
        if (workRes.ok) setWorkers(await workRes.json());
      } catch (err) {
        console.error("Critical System Failure:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [companyId]);

  // Clean string helper: handles "09:00:00" -> "09:00" or returns as is
  const formatTimeString = (timeStr: string) => {
    if (!timeStr) return "00:00";
    // If string is HH:MM:SS, slice it to HH:MM
    if (timeStr.includes(":") && timeStr.split(":").length >= 2) {
      const [hours, minutes] = timeStr.split(":");
      return `${hours}:${minutes}`;
    }
    return timeStr;
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-amber-500" size={32} />
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500/50 italic">
          Accessing Sector...
        </span>
      </div>
    );

  if (!company)
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-zinc-500 p-6 text-center">
        <p className="font-serif italic text-2xl mb-6 text-white">
          Unauthorized: Entity Not Found
        </p>
        <Link
          href="/superAdmin"
          className="group flex items-center gap-2 text-amber-500 border border-amber-500/20 px-6 py-3 hover:bg-amber-500/10 transition-all text-[10px] font-black uppercase tracking-[0.2em]"
        >
          <ArrowLeft size={14} /> Return to Terminal
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-amber-500/30 overflow-x-hidden">
      {/* Ambient Background Glows */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-amber-600/10 blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/5 blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto p-8 lg:p-16">
        <Link
          href="/superAdmin"
          className="group inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 hover:text-amber-500 transition-colors mb-12"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          System Overview
        </Link>

        <header className="mb-20">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="px-3 py-1 border border-amber-500/20 bg-amber-500/5 text-amber-500 text-[9px] font-black uppercase tracking-[0.3em]">
              <Zap size={10} className="inline mr-2 fill-current" />
              Type of Company // {company.typeOfCompany || "Sector_Alpha"}
            </div>
            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest pt-1">
              Company ID:{" "}
              {companyId ? companyId.toString().slice(0, 8) : "00000000"}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h1 className="text-6xl md:text-8xl font-serif italic leading-none tracking-tighter text-white">
              {company.name}
            </h1>
            <div className="flex items-center gap-4 border-l-2 border-amber-500/40 pl-6 py-2">
              <MapPin size={20} className="text-amber-500" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500/40">
                  Компани Байршил
                </p>
                <p className="text-lg font-mono uppercase text-zinc-300">
                  {company.location || "NON_SPATIAL"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Analysis Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-amber-500/10 border border-amber-500/10 mb-24 shadow-2xl">
          <div className="bg-black p-10 group transition-all duration-500">
            <div className="flex items-center gap-2 mb-8">
              <Clock size={14} className="text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/40">
                Ажлын Цаг
              </span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-5xl md:text-7xl font-black italic text-white tracking-tighter">
                {formatTimeString(company.openTime)}
              </span>
              <span className="text-zinc-800 font-serif italic text-3xl">
                /
              </span>
              <span className="text-5xl md:text-7xl font-black italic text-white tracking-tighter">
                {formatTimeString(company.closeTime)}
              </span>
            </div>
            <div className="mt-10 h-[2px] w-full bg-zinc-900 group-hover:bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0)] group-hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all duration-700" />
          </div>

          <div className="bg-black p-10 group transition-all duration-500">
            <div className="flex items-center gap-2 mb-8">
              <MessageSquare size={14} className="text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/40">
                Feedback
              </span>
            </div>
            <p className="text-xl md:text-2xl font-serif italic text-zinc-400 leading-tight">
              {company.feedback
                ? `"${company.feedback}"`
                : "Яг одоогоор Feedback алга байна."}
            </p>
            <div className="mt-10 h-[2px] w-full bg-zinc-900 group-hover:bg-amber-500 transition-all duration-700" />
          </div>
        </div>

        {/* Personnel Registry */}
        <section className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 pl-4 border-l-2 border-amber-500">
            <h2 className="text-2xl font-black tracking-tighter uppercase flex items-center gap-4">
              <Users size={20} className="text-amber-500" /> Stationed Personnel
            </h2>
            <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
              Units: {workers.length.toString().padStart(2, "0")}
            </span>
          </div>

          <div className="border border-white/5 bg-zinc-950/20 overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-white/5 border-white/5">
              {workers.map((worker) => (
                <div
                  key={worker.id}
                  className="p-10 group hover:bg-amber-500/[0.03] transition-all duration-300 cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-3xl font-serif italic text-white group-hover:text-amber-400 transition-colors">
                      {worker.name}
                    </h3>
                    <ChevronRight
                      size={18}
                      className="text-zinc-800 group-hover:text-amber-500 group-hover:translate-x-1 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
                      Personnel_Grade
                    </span>
                    <p className="text-xs font-mono uppercase text-zinc-400">
                      {worker.experience || "STANDARD_OPS"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 pt-10 border-t border-amber-500/10 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)]">
              <Fingerprint size={16} className="text-zinc-600" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.4em]">
                Chronos System Layer
              </p>
              <p className="text-[8px] font-mono text-zinc-600 uppercase">
                Sector: {companyId?.toString().slice(0, 4)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-amber-500/40 text-[9px] font-black uppercase tracking-[0.3em]">
            <Globe size={12} /> Pinecone Academy // Alpha-Core
          </div>
        </footer>
      </div>
    </div>
  );
}
