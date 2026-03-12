"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Globe,
  MoveRight,
  MoveLeft,
  Zap,
  ArrowLeft,
} from "lucide-react";

const Page = () => {
  const [step, setStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    setIsExiting(true);
    setTimeout(() => {
      setStep((prev) => (prev === 0 ? 1 : 0));
      setIsExiting(false);
    }, 400);
  };

  return (
    <main className="min-h-screen bg-[#020203] text-zinc-100 flex items-center justify-center p-6 selection:bg-fuchsia-500/30 overflow-hidden relative">
      <button
        onClick={() => router.push("/")}
        className="fixed top-8 left-8 z-50 group flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 group-hover:text-white">
          Буцах
        </span>
      </button>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full transition-all duration-1000 ${step === 1 ? "translate-x-full" : ""}`}
        />
        <div
          className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full transition-all duration-1000 ${step === 1 ? "-translate-x-full" : ""}`}
        />
      </div>

      <div className="relative w-full max-w-4xl">
        <div
          className={`relative transition-all duration-500 transform 
          ${isExiting ? "opacity-0 -translate-x-12 scale-95" : "opacity-100 translate-x-0 scale-100"}
          ${!isExiting ? "animate-in fade-in slide-in-from-right-12 duration-700" : ""}`}
        >
          <div className="relative group">
            <div className="absolute -inset-px bg-gradient-to-r from-fuchsia-600/30 to-indigo-600/30 rounded-[2.5rem] blur-md opacity-25 group-hover:opacity-40 transition duration-1000" />

            <div className="relative bg-zinc-950/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-14 shadow-2xl">
              {step === 0 ? (
                <div className="space-y-12">
                  <div className="max-w-2xl space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-400">
                      <Sparkles size={12} /> Бидний тухай
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif italic leading-none">
                      Ирээдүйн{" "}
                      <span className="font-sans font-black not-italic text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
                        Систем
                      </span>
                    </h1>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-7">
                      <div className="p-8 h-full rounded-[2rem] border border-white/5 bg-white/[0.02] hover:border-fuchsia-500/30 transition-all duration-500">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-500 shrink-0">
                            <Globe size={24} />
                          </div>
                          <div className="space-y-4">
                            <h3 className="font-bold uppercase tracking-widest text-sm text-fuchsia-400">
                              Дижитал Шилжилт
                            </h3>
                            <p className="text-zinc-400 leading-relaxed font-medium">
                              "Digital Transformation&ldquo; бол зөвхөн цаасыг
                              дэлгэцээр солих биш, харин амьдралын хэв маяг юм.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-5 flex flex-col justify-center items-center">
                      <button
                        onClick={handleNext}
                        className="group flex flex-col items-center gap-4 p-8 w-full rounded-[2rem] bg-white/5 border border-white/10 hover:bg-fuchsia-500/10 hover:border-fuchsia-500/50 transition-all duration-500"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-fuchsia-400">
                          Дараагийнх
                        </span>
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-fuchsia-500 group-hover:text-white transition-all shadow-xl">
                          <MoveRight
                            size={32}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-12">
                  <div className="max-w-2xl space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
                      <Zap size={12} /> Давуу тал
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif italic leading-none">
                      Яагаад{" "}
                      <span className="font-sans font-black not-italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">
                        Chronos
                      </span>
                      ?
                    </h1>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                      <div className="text-3xl font-black italic text-zinc-800 mb-4 group-hover:text-indigo-500 transition-colors">
                        01
                      </div>
                      <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">
                        Үр ашиг
                      </h4>
                      <p className="text-zinc-500 text-sm leading-relaxed">
                        Систем ашигласнаар хүн бүрийн ажлыг 30 секунд болгож
                        товчилно.
                      </p>
                    </div>

                    <div className="group p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                      <div className="text-3xl font-black italic text-zinc-800 mb-4 group-hover:text-fuchsia-500 transition-colors">
                        02
                      </div>
                      <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">
                        Автоматжуулалт
                      </h4>
                      <p className="text-zinc-500 text-sm leading-relaxed">
                        Таныг унтаж байх хооронд ч бизнес тань захиалга авсаар
                        байна.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleNext}
                    className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-all group"
                  >
                    <MoveLeft
                      size={14}
                      className="group-hover:-translate-x-1 transition-transform"
                    />{" "}
                    Буцах
                  </button>
                </div>
              )}

              <div className="mt-12 flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="flex gap-2">
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${step === 0 ? "bg-fuchsia-500 w-6" : "bg-white/20"}`}
                  />
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${step === 1 ? "bg-indigo-500 w-6" : "bg-white/20"}`}
                  />
                </div>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
