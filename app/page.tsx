"use client";

import { ArrowUpRight, Globe, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import ChronosHeaderBar from "./_component/ChronosHeaderBar";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function ChronosPrestige() {
  const { push } = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) return;

    const checkUserRole = async () => {
      try {
        const res = await fetch("/api/userCheck");
        const data = await res.json();
        if (data.role === "WORKER") {
          push(`/dashboard/worker/${data.id}/`);
        } else if (data.role === "USER") {
          push(`/dashboard/user/${data.id}/`);
        }
      } catch (error) {
        console.error("Error checking user role:", error);
      }
    };

    checkUserRole();
  }, [isSignedIn, push]);
  return (
    <div className="min-h-screen w-full bg-[#020203] text-gray-100 font-sans selection:bg-fuchsia-500/30 overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full" />
      </div>
      <ChronosHeaderBar />
      <header className="relative min-h-screen flex items-center px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-8">
            <div className="inline-flex items-center gap-3">
              <Sparkles size={14} className="text-fuchsia-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-fuchsia-500">
                Цагийн удирдлагын систем
              </span>
            </div>
            <h1 className="text-6xl sm:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.82] text-white italic overflow-visible">
              Цаг бол таны <br />
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-400 to-indigo-500">
                хамгийн чухал хөрөнгө
              </span>
            </h1>
          </div>

          <div className="lg:col-span-4 lg:pt-32 space-y-10">
            <div className="relative p-8 border-l border-fuchsia-500/30 bg-white/[0.02] backdrop-blur-sm">
              <p className="text-lg text-gray-300 font-light leading-relaxed">
                Орчин үеийн үйлчилгээний байгууллагуудад зориулсан үндсэн
                <span className="text-fuchsia-400 font-medium"> дэд бүтэц</span>
                . Байгууллагаа үүсгэж мэдлэг чадвараа бодит цагт орлого болго.
              </p>
            </div>

            <button
              onClick={() => push("/dashboard")}
              className="group flex items-center gap-6 text-white bg-white/5 border border-white/10 px-8 py-5 rounded-full hover:bg-fuchsia-500/10 hover:border-fuchsia-500 transition-all duration-500"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.4em]">
                Систем нээх
              </span>

              <div className="p-2 bg-fuchsia-600 rounded-full group-hover:rotate-45 transition-transform">
                <ArrowUpRight size={18} />
              </div>
            </button>
          </div>
        </div>
      </header>
      <section className="px-6 sm:px-12 lg:px-24 py-32 border-t border-white/[0.05] bg-black/40">
        <div className="max-w-7xl mx-auto w-full space-y-20">
          <header className="flex justify-between items-end border-b border-white/[0.05] pb-8">
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-white">
                Шууд сүлжээ
              </h2>

              <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                Одоогоор цаг санал болгож буй мэргэжилтнүүд
              </p>
            </div>

            <span className="text-[10px] font-mono text-fuchsia-500 uppercase tracking-widest">
              LIVE_SYNC_2026
            </span>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05] border border-white/[0.05]">
            <WorkerLiquidCard
              name="Төгөлдөр"
              specialty="Стратеги"
              slots={["09:00", "11:00", "14:00"]}
              price="$150"
            />

            <WorkerLiquidCard
              name="Төрболд"
              specialty="Дизайн"
              slots={["08:00", "12:00", "15:00"]}
              price="$180"
              active
            />
            <WorkerLiquidCard
              name="Tөрбат"
              specialty="Захирал"
              slots={["10:00", "13:00", "16:00"]}
              price="$300"
            />
            <WorkerLiquidCard
              name="Зэлэм"
              specialty="стратеги"
              slots={["09:00", "11:00", "14:00"]}
              price="$150"
            />
            <WorkerLiquidCard
              name="Болорсайхан"
              specialty="инженерчлэл"
              slots={["10:00", "13:00", "16:00"]}
              price="$250"
            />
            <WorkerLiquidCard
              name="Энхсайхан"
              specialty="инженерчлэл"
              slots={["10:00", "13:00", "16:00"]}
              price="$220"
            />
          </div>
        </div>
      </section>
      <footer className="px-6 sm:px-12 lg:px-24 py-16 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-8 text-gray-600">
          <div className="text-[9px] font-bold uppercase tracking-[0.5em]">
            ©2026 CHRONOS БАЙГУУЛЛАГА
          </div>

          <div className="flex items-center gap-3">
            <Globe size={12} className="text-fuchsia-500" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em]">
              Дэлхийн дэд бүтэц
            </span>
          </div>
        </div>
      </footer>
    </div>
  );

  function WorkerLiquidCard({ name, specialty, slots, price, highlight }: any) {
    return (
      <div
        className={`p-10 group transition-all relative overflow-hidden ${highlight ? "bg-fuchsia-600/[0.03]" : "bg-[#0A0A0A] hover:bg-white/[0.02]"}`}
      >
        <div
          className={`absolute top-0 left-0 w-full h-px transition-all duration-700 ${highlight ? "bg-fuchsia-500/50" : "bg-fuchsia-500/0 group-hover:bg-fuchsia-500/50"}`}
        />

        <div className="flex justify-between items-start mb-12">
          <div className="w-12 h-12 rounded-full border border-white/50 bg-gradient-to-br from-zinc-800 to-black overflow-hidden flex items-center justify-center">
            <img src={"pinecone.png"} />
          </div>
          <div className="text-right">
            <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mb-1">
              Үнэ
            </p>
            <p className="text-xl font-light text-white font-mono">
              {price}
              <span className="text-[10px] text-fuchsia-500 font-sans ml-1">
                /цаг
              </span>
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h4 className="text-2xl font-bold tracking-tighter text-white mb-1 uppercase group-hover:text-fuchsia-400 transition-colors italic">
            {name}
          </h4>
          <p className="text-[9px] text-fuchsia-500 font-bold uppercase tracking-[0.3em]">
            {specialty}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-[8px] font-bold text-gray-700 uppercase tracking-[0.4em]">
            Боломжит цагууд
          </p>
          <div className="flex flex-wrap gap-2">
            {slots.map((s: string) => (
              <button
                key={s}
                className="px-4 py-1.5 border border-white/10 text-[9px] font-mono text-gray-400 hover:bg-fuchsia-600 hover:border-fuchsia-600 hover:text-white transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
