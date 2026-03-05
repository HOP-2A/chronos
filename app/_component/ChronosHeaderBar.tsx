"use client";

import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChronosNavbar() {
  const { push } = useRouter();

  return (
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
        <button
          onClick={() => push("/dashboard/worker/workerCompanies")}
          className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-fuchsia-500 transition-colors"
        >
          Байгууллагууд
        </button>

        <button className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-fuchsia-500 transition-colors">
          Философи
        </button>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent animate-pulse" />
      <button className="px-6 py-3 bg-black text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-fuchsia-500 hover:text-white transition-all active:scale-[0.98]"></button>
    </nav>
  );
}
