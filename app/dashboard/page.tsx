"use client";

import { SignUpButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { chronosClerkAppearance } from "../_component/ChronosClerk";
import { useEffect, useState } from "react";

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
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const checkUserRole = async () => {
      const res = await fetch("/api/userCheck");
      const data = await res.json();

      if (data.role === "WORKER") {
        push(`/dashboard/worker/${user.id}/`);
      }

      if (data.role === "USER") {
        push(`/dashboard/user/${user.id}/`);
      }
    };

    checkUserRole();
  }, [isLoaded, isSignedIn, push]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at center, black 35%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 35%, transparent 70%)",
          }}
        />
        <div className="absolute -top-48 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-purple-500/25 blur-[120px]" />
        <div className="absolute -bottom-56 right-[-120px] h-[520px] w-[520px] rounded-full bg-sky-500/20 blur-[130px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-14">
        <div className="w-full">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_18px_rgba(168,85,247,0.9)]" />
              chronos • дүр сонголт
            </div>

            <h1 className="mt-6 text-balance text-5xl font-black tracking-tight sm:text-6xl">
              <span className="bg-gradient-to-r from-purple-300 via-purple-400 to-sky-300 bg-clip-text text-transparent">
                CHRONOS - д <br />
              </span>
              тавтай морил
            </h1>

            <p className="mt-4 text-pretty text-base text-white/70 sm:text-lg">
              Дүрээ сонгож үргэлжлэнэ үү, та дараа үүнийг солих боломжтой.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => {
                  push("/dashboard/worker/workerCompanies/");
                }}
                disabled={!isLoaded}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] p-6 text-left transition hover:border-purple-400/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-purple-500/25 blur-[60px]" />
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/15 ring-1 ring-purple-400/20">
                    <span className="text-xl">🛠️</span>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-xl font-semibold tracking-tight">
                    АЖИЛТАН
                  </div>
                  <p className="mt-1 text-sm text-white/70">
                    хуваарь харах • ажлаа удирдах
                  </p>
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/90">
                  үргэлжлэх
                  <span className="transition group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
              </button>

              <SignUpButton
                mode="modal"
                forceRedirectUrl="/after-auth"
                appearance={chronosClerkAppearance}
              >
                <button
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] p-6 text-left transition hover:border-sky-400/40 hover:shadow-[0_0_40px_rgba(56,189,248,0.22)]"
                  type="button"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                    <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-sky-500/25 blur-[60px]" />
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 ring-1 ring-sky-400/20">
                      <span className="text-xl">👤</span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="text-xl font-semibold tracking-tight">
                      ХЭРЭГЛЭГЧ
                    </div>
                    <p className="mt-1 text-sm text-white/70">
                      хаяг үүсгэж компаниудын үйлчилгээг хэрэглэх
                    </p>
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/90">
                    хаяг бүртгүүлэх
                    <span className="transition group-hover:translate-x-0.5">
                      →
                    </span>
                  </div>
                </button>
              </SignUpButton>
            </div>

            <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 sm:flex-row">
              <p className="text-xs text-white/55">
                үргэлжлүүлснээр та chronos-ийн нөхцөл зөвшөөрч байна.
              </p>

              <div className="flex items-center gap-2 text-xs text-white/55">
                <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                clerk-ээр хамгаалагдсан нэвтрэлт систэм
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
