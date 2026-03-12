"use client";

import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { chronosClerkAppearance } from "../_component/ChronosClerk";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  clerkId: string;
  companyId: string;
};

const Page = () => {
  const { push } = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

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
  }, [isLoaded, isSignedIn, push]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white">
      <button
        onClick={() => push("/")}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 backdrop-blur-xl transition hover:bg-white/10 hover:text-white"
      >
        <ArrowLeft size={14} />
        НҮҮР ХУУДАС
      </button>

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-14">
        <div className="w-full">
          <div className="mx-auto max-w-2xl text-center space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/5 bg-white/[0.02] px-4 py-2 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500 animate-pulse shadow-[0_0_12px_rgba(192,38,211,1)]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-fuchsia-500/80">
                Chronos • Дүр сонголт
              </span>
            </div>
            <h1 className="text-6xl sm:text-7xl font-black tracking-tighter leading-[0.85] text-white italic overflow-visible">
              CHRONOS - Д <br />
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-400 to-indigo-500">
                ТАВТАЙ МОРИЛ
              </span>
            </h1>
            <p className="mx-auto max-w-md text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 leading-relaxed">
              Үргэлжлүүлэх дүрээ сонгоно уу. Та өөрийн үүрэгт тохирсон хянах
              самбарт нэвтрэх болно.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-4xl grid gap-px bg-white/[0.05] border border-white/[0.05] overflow-hidden">
            <div className="grid sm:grid-cols-2">
              <button
                onClick={() => push("/dashboard/worker/workerCompanies/")}
                disabled={!isLoaded}
                className="group relative bg-[#0A0A0A] p-10 text-left transition-all hover:bg-white/[0.02] disabled:opacity-50 border-r border-white/[0.05]"
              >
                <div className="absolute top-0 left-0 w-full h-px bg-fuchsia-500/0 group-hover:bg-fuchsia-500/50 transition-all duration-700" />

                <div className="mb-12 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-zinc-800 to-black group-hover:border-fuchsia-500/50 transition-colors">
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    🛠️
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl font-bold italic tracking-tighter text-white uppercase group-hover:text-fuchsia-400 transition-colors">
                    Ажилтан
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-fuchsia-500/60">
                    Хуваарь харах • Ажлаа удирдах
                  </p>
                </div>

                <div className="mt-12 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">
                  Нэвтрэх
                  <div className="p-2 bg-fuchsia-600 rounded-full group-hover:rotate-45 transition-transform text-white">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
              </button>
              <SignUpButton
                mode="modal"
                forceRedirectUrl="/after-auth"
                appearance={chronosClerkAppearance}
              >
                <button className="group relative bg-[#0A0A0A] p-10 text-left transition-all hover:bg-white/[0.02]">
                  <div className="absolute top-0 left-0 w-full h-px bg-indigo-500/0 group-hover:bg-indigo-500/50 transition-all duration-700" />

                  <div className="mb-12 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-zinc-800 to-black group-hover:border-indigo-500/50 transition-colors">
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      👤
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold italic tracking-tighter text-white uppercase group-hover:text-indigo-400 transition-colors">
                      Хэрэглэгч
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-500/60">
                      Үйлчилгээ авах • Цаг захиалах
                    </p>
                  </div>

                  <div className="mt-12 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">
                    Бүртгүүлэх
                    <div className="p-2 bg-indigo-600 rounded-full group-hover:rotate-45 transition-transform text-white">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </div>
                </button>
              </SignUpButton>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/40 p-6 border-t border-white/[0.05]">
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-600">
                ©2026 CHRONOS • Системд нэвтэрснээр та нөхцөлийг зөвшөөрч буй юм
              </p>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-green-500" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">
                  Secure Auth via Clerk
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
