"use client";

import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  Globe,
  Clock,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Toaster } from "sonner";

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
  const [isSidebarOpen, setSidebarOpen] = useState(true);
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
    <div className="flex h-screen bg-[#020203] text-gray-100 font-sans selection:bg-fuchsia-500/30 overflow-hidden">
      <Toaster theme="dark" position="top-center" />
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/5 blur-[120px] rounded-full pointer-events-none" />
        <nav className="fixed top-0 w-full z-50 border-b border-white/[0.05] bg-black/60 backdrop-blur-2xl px-6 sm:px-12 lg:px-24 py-6 flex items-center justify-between relative">
          <div
            className="flex items-center gap-4 group cursor-pointer"
            onClick={() => push("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-fuchsia-600 to-purple-600 text-white rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-180 shadow-[0_0_20px_rgba(192,38,211,0.3)]">
              <Clock size={16} strokeWidth={3} />
            </div>

            <span className="text-[20px] font-bold uppercase tracking-[0.5em] text-white">
              Chronos
            </span>
          </div>
          <div className="hidden md:flex items-center gap-12">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-fuchsia-500 transition-colors"></div>

            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-fuchsia-500 transition-colors"></div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent animate-pulse" />
          <button
            className="px-6 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-fuchsia-500 hover:text-white transition-all active:scale-[0.98]"
            onClick={() => push("/createCompany")}
          >
            БАЙГУУЛЛАГА YYСГЭХ
          </button>
        </nav>
        <section className="flex-1 overflow-y-auto p-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05] border border-white/[0.05]">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : company.map((a, index) => (
                    <div
                      key={index}
                      className="group relative bg-[#0A0A0A] hover:bg-white/[0.02] transition-all duration-500 p-8 flex flex-col"
                    >
                      <div className="absolute top-0 left-0 w-full h-px bg-fuchsia-500/0 group-hover:bg-fuchsia-500/50 transition-all duration-700" />

                      <div className="relative aspect-video w-full overflow-hidden rounded-sm mb-6 border border-white/[0.05]">
                        {a.image ? (
                          <img
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            src={a.image}
                            alt={a.name}
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-[10px] font-bold text-gray-700 uppercase tracking-widest">
                            No Media
                          </div>
                        )}
                        <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-xs">
                          <span className="text-[8px] font-bold text-fuchsia-400 uppercase tracking-widest">
                            {a.typeOfCompany || "Service"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4 mb-8">
                        <h3 className="text-2xl font-bold tracking-tighter text-white uppercase italic group-hover:text-fuchsia-400 transition-colors">
                          {a.name}
                        </h3>
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1 h-1 bg-fuchsia-500 rounded-full" />
                            {a.location}
                          </p>
                          <p className="text-[9px] font-mono text-gray-600 bg-white/[0.03] px-2 py-1 inline-block border border-white/[0.05]">
                            Working Hours Configured
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => push(`/company/companyDetails/${a.id}`)}
                        className="mt-auto w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-fuchsia-600 hover:text-white active:scale-[0.98] flex items-center justify-center gap-2"
                      >
                        Компани руу очих
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  ))}
            </div>

            <div className="mt-12 p-12 border border-dashed border-white/10 bg-white/[0.01] flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center text-gray-600">
                <Sparkles size={20} />
              </div>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">
                System Status: Synchronized • ©2026 Chronos
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

function NavItem({
  icon,
  label,
  active = false,
  isOpen = true,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  isOpen?: boolean;
}) {
  return (
    <div
      className={`
      flex items-center ${isOpen ? "gap-4 px-4" : "justify-center"} py-4 rounded-sm cursor-pointer transition-all duration-300 group
      ${
        active
          ? "text-fuchsia-500 bg-fuchsia-500/[0.03] border-l-2 border-fuchsia-500"
          : "text-gray-500 hover:text-white hover:bg-white/[0.02] border-l-2 border-transparent"
      }
    `}
    >
      <div
        className={`${active ? "text-fuchsia-500" : "group-hover:text-fuchsia-400"} transition-colors`}
      >
        {icon}
      </div>
      {isOpen && (
        <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
          {label}
        </span>
      )}
    </div>
  );
}

const SkeletonCard = () => (
  <div className="bg-[#0A0A0A] p-8 animate-pulse space-y-6">
    <div className="aspect-video w-full bg-white/5 rounded-sm" />
    <div className="space-y-3">
      <div className="h-6 w-3/4 bg-white/5 rounded" />
      <div className="h-3 w-1/2 bg-white/5 rounded" />
    </div>
    <div className="h-12 w-full bg-white/5 rounded" />
  </div>
);

export default UserPanel;
