"use client";

import { useRouter } from "next/navigation";
import {
  Zap,
  ArrowRight,
  Globe,
  LayoutDashboard,
  Fingerprint,
  Plus,
} from "lucide-react";
import React from "react";

type RecentCompany = {
  id: string;
  name: string;
  location: string | null;
};

interface AdminProps {
  companyCount: number;
  workerCount: number;
  userCount: number;
  scheduleCount: number;
  recentCompanies: RecentCompany[];
}

export default function AdminDashboardClient({
  companyCount,
  workerCount,
  userCount,
  scheduleCount,
  recentCompanies,
}: AdminProps) {
  const { push } = useRouter();

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-amber-500/30 font-sans overflow-x-hidden">
      {/* Aesthetic Background Elements */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-amber-600/10 blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/5 blur-[120px] pointer-events-none z-0" />

      {/* FIXED TOP NAVIGATION (Replaces Sidebar) */}
      <nav className="sticky top-0 z-[60] w-full border-b border-amber-500/10 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 pr-8 border-r border-white/5">
              <div className="w-6 h-6 border-2 border-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <Fingerprint size={14} className="text-amber-500" />
              </div>
              <span className="font-black tracking-[0.2em] text-sm uppercase italic">
                CHRONOS
              </span>
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={() => push("/superAdmin")}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-amber-500"
              >
                <LayoutDashboard size={14} />
                Overview
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => push("/superAdmin/create-company")}
              className="hidden sm:flex items-center gap-2 bg-amber-500 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-black hover:bg-amber-400 transition-colors"
            >
              <Plus size={14} strokeWidth={3} /> New Sector
            </button>
            {/* The UserButton from your RootLayout will appear in this general area */}
            <div className="w-10 h-10 ml-4 border border-white/10 bg-white/5 hidden md:block" />
          </div>
        </div>
      </nav>

      <div className="relative z-10">
        <main className="max-w-7xl mx-auto p-8 lg:p-16 lg:pt-24">
          <header className="mb-20 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-amber-500/20 bg-amber-500/5 text-amber-500 text-[9px] font-black uppercase tracking-[0.3em] mb-6">
              <Zap size={10} fill="currentColor" /> Authorized Admin Terminal
            </div>

            <h1 className="text-7xl md:text-9xl font-serif italic leading-[0.8] tracking-tighter text-white">
              Admin <br />
              <span className="font-sans font-black not-italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-500 to-yellow-600">
                Authority.
              </span>
            </h1>
          </header>

          {/* Metrics Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-amber-500/10 border border-amber-500/10 mb-24 shadow-2xl">
            <MetricBox label="Нийт Компаниуд" value={companyCount} />
            <MetricBox label="Ажилтаны Тоо" value={workerCount} />
            <MetricBox label="Нийт Хэрэглэгчид" value={userCount} />
            <MetricBox label="Цагийн Хуваариуд" value={scheduleCount} />
          </section>

          {/* Recent Activity Table */}
          <section>
            <div className="flex justify-between items-end mb-10 pl-4 border-l-2 border-amber-500">
              <h2 className="text-2xl font-black tracking-tighter uppercase">
                Recent Sectors
              </h2>
            </div>

            <div className="border border-white/5 bg-zinc-950/20 backdrop-blur-sm overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-amber-500/10 bg-amber-500/[0.02]">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/50">
                      ID
                    </th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/50">
                      Sector Name
                    </th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/50">
                      Coordinates
                    </th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/50 text-right">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {recentCompanies.length > 0 ? (
                    recentCompanies.map((c, idx) => (
                      <tr
                        key={c.id}
                        onClick={() => push(`/superAdmin/company/${c.id}`)}
                        className="group hover:bg-amber-500/[0.03] transition-all cursor-pointer"
                      >
                        <td className="px-8 py-10 font-mono text-zinc-700 text-sm group-hover:text-amber-500/40">
                          {(idx + 1).toString().padStart(2, "0")}
                        </td>
                        <td className="px-8 py-10 font-serif italic text-3xl group-hover:text-amber-400 transition-colors">
                          {c.name}
                        </td>
                        <td className="px-8 py-10 text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                          {c.location || "NON_SPATIAL"}
                        </td>
                        <td className="px-8 py-10 text-right">
                          <div className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-amber-500">
                            Configure{" "}
                            <ArrowRight
                              size={14}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-8 py-20 text-center text-zinc-600 font-mono uppercase tracking-widest text-xs"
                      >
                        No active sectors found in database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      <footer className="py-20 px-12 border-t border-amber-500/10 bg-black mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.5em]">
            System: Chronos Auth // SuperAdmin Node // v4.0.1
          </div>
          <div className="flex items-center gap-3 text-amber-500/40 text-[9px] font-black uppercase tracking-widest">
            <Globe size={12} /> Pinecone Academy
          </div>
        </div>
      </footer>
    </div>
  );
}

function MetricBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-black p-10 flex flex-col justify-between group transition-all duration-500 border-r border-amber-500/5 last:border-r-0">
      <div>
        <p className="text-[9px] font-black text-amber-500/40 uppercase tracking-[0.3em] mb-4">
          {label}
        </p>
        <h3 className="text-6xl font-black text-white italic tracking-tighter">
          {value.toString().padStart(2, "0")}
        </h3>
      </div>
      <div className="mt-10 h-[2px] w-full bg-zinc-900 group-hover:bg-amber-500 transition-all duration-700 shadow-[0_0_15px_rgba(245,158,11,0)] group-hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
    </div>
  );
}
