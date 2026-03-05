"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight, Clock, Clock3, Globe, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChronosPrestige() {
  const { push } = useRouter();
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
            onClick={() => push("/company/companies/")}
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

      <header className="relative pt-48 pb-24 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-fuchsia-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Sparkles size={12} className="text-fuchsia-500" /> цаг захиалах
            <Clock3 size={12} className="text-fuchsia-500" />
          </div>

          <h1 className="text-6xl md:text-[5.5rem] font-serif italic leading-[1] tracking-tight text-white">
            Цаг бол таны чухал <br />
            <span className="font-sans font-black not-italic text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-300 to-indigo-400">
              хөрөнгө.
            </span>
          </h1>

          <p className="text-zinc-500 text-lg max-w-xl mx-auto font-medium leading-relaxed">
            Орчин үеийн үйлчилгээний бизнесийн суурь систем. <br /> Компани
            байгуул. Ур чадвараа бодит цагт зах зээлд гарга.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <Button
              onClick={() => push("/dashboard")}
              size="lg"
              className="h-14 px-10 rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold uppercase text-[11px] tracking-widest shadow-[0_10px_30px_rgba(192,38,211,0.3)]"
            >
              Үргэлжлэх
            </Button>
          </div>
        </div>
      </header>

      <section className="py-20 bg-gradient-to-b from-transparent via-fuchsia-500/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter uppercase italic">
                шууд сүлжээ
              </h2>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                одоо үйлчилгээний цагаа борлуулж буй мэргэжилтнүүд
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <WorkerLiquidCard
              name="Төрболд"
              specialty="дизайн"
              slots={["08:00", "12:00", "15:00"]}
              price="$180"
              active
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
}

function WorkerLiquidCard({
  name,
  specialty,
  slots,
  price,
  active = false,
}: any) {
  return (
    <div
      className={`p-6 rounded-[2.5rem] border ${active ? "border-fuchsia-500/50 bg-fuchsia-500/[0.03]" : "border-white/5 bg-zinc-950/30"} group hover:bg-white/[0.02] transition-all duration-500`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-full border-2 border-white/10 overflow-hidden bg-zinc-800" />
        <div className="text-right">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
            Үнэ
          </p>
          <p className="text-lg font-black text-white">
            {price}
            <span className="text-[10px] text-zinc-500 font-normal">/hr</span>
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-bold text-lg leading-tight uppercase italic">
          {name}
        </h4>
        <p className="text-xs text-fuchsia-500 font-bold uppercase tracking-widest">
          {specialty}
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-3">
          Боломжот цагууд
        </p>
        <div className="flex flex-wrap gap-2">
          {slots.map((s: string) => (
            <button
              key={s}
              className="px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold hover:bg-fuchsia-600 hover:border-fuchsia-600 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
