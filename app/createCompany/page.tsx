"use client";

import * as React from "react";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Building2,
  MapPin,
  Briefcase,
  Clock,
  PlusCircle,
  Globe,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import { upload } from "@vercel/blob/client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { TimePicker } from "../_component/TimePicker";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import ChronosHeaderBar from "../_component/ChronosHeaderBar";

type CompanyInfo = {
  name: string;
  typeOfCompany: string;
  location: string;
  openTime: Date | null;
  closeTime: Date | null;
  image: string;
  adminID: string;
  workers: Array<{
    email: string;
    name: string;
    phoneNumber: string;
    experience: string[];
    feedback: string[];
  }>;
};

const BG_URL = "";

export default function Page() {
  const { push } = useRouter();
  const [info, setInfo] = useState<CompanyInfo>({
    name: "",
    typeOfCompany: "",
    location: "",
    openTime: null,
    closeTime: null,
    image: "",
    adminID: "",
    workers: [
      { email: "", name: "", phoneNumber: "", experience: [], feedback: [] },
    ],
  });
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo((prev) => {
      if (name === "companyName") return { ...prev, name: value };
      if (name === "companyType") return { ...prev, typeOfCompany: value };
      if (name === "location") return { ...prev, location: value };
      return prev;
    });
  };
  console.log(file);

  // Inside your Page component...

  const createCompany = async () => {
    try {
      setIsSubmitting(true);
      const payload = {
        name: info.name,
        typeOfCompany: info.typeOfCompany,
        location: info.location,
        image: info.image,
        openTime: info.openTime ? info.openTime.toISOString() : null,
        closeTime: info.closeTime ? info.closeTime.toISOString() : null,
      };

      const res = await fetch("/api/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create company");
      }

      const data = await res.json();

      toast.success("Байгууллага амжилттай үүслээ!");
      push(`/company/admin/${data.id}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  const fetchFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);

    const previewUrl = URL.createObjectURL(selectedFile);
    setInfo((prev) => ({
      ...prev,
      image: previewUrl,
    }));
  };

  const uploadPhoto = async () => {
    if (!file) return;

    try {
      setUploading(true);

      const uploaded = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/image",
      });

      setInfo((prev) => ({
        ...prev,
        image: uploaded.url,
      }));
      setFile(null);
      toast.success("Photo uploaded successfully");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };
  const baseDate = React.useMemo(() => new Date(), []);

  const timesInvalid =
    !!info.openTime && !!info.closeTime && info.closeTime <= info.openTime;

  const canSubmit =
    info.name.trim() &&
    info.typeOfCompany.trim() &&
    info.location.trim() &&
    info.openTime &&
    info.closeTime &&
    !timesInvalid;

  return (
    <div className="min-h-screen bg-[#020203] text-gray-100 font-sans selection:bg-fuchsia-500/30 overflow-x-hidden">
      <Toaster theme="dark" position="top-center" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full" />
      </div>
      <ChronosHeaderBar />
      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-24">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-3">
              <Sparkles size={14} className="text-fuchsia-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-fuchsia-500">
                Бизнес бүртгэл
              </span>
            </div>
            <h1 className="text-6xl sm:text-7xl font-black tracking-tighter text-white italic leading-[1.25] overflow-visible break-words">
              ШИНЭ <br />
              <span className="block bg-gradient-to-r from-fuchsia-500 via-purple-400 to-indigo-500 text-transparent bg-clip-text">
                БАЙГУУЛЛАГА
              </span>
            </h1>

            <p className="text-lg text-gray-400 font-light leading-relaxed border-l border-fuchsia-500/30 pl-6">
              Өөрийн үйлчилгээний дэд бүтцийг үүсгэж, цаг захиалгын ухаалаг
              системд нэгдээрэй.
            </p>
          </div>
          <div className="lg:col-span-7 bg-[#0A0A0A] border border-white/[0.05] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent" />

            <div className="p-8 sm:p-12 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6 md:col-span-2">
                  <div className="group">
                    <label className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-2 group-focus-within:text-fuchsia-500 transition-colors">
                      <Building2 size={12} /> Байгууллагын нэр
                    </label>
                    <input
                      name="companyName"
                      value={info.name}
                      onChange={handleInputValue}
                      placeholder="Жишээ: Paradox Barbers"
                      className="w-full bg-white/[0.02] border border-white/10 p-4 text-sm focus:border-fuchsia-500/50 focus:outline-none transition-all placeholder:text-gray-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-2 group-focus-within:text-fuchsia-500 transition-colors">
                        <Briefcase size={12} /> Чиглэл
                      </label>
                      <input
                        name="companyType"
                        value={info.typeOfCompany}
                        onChange={handleInputValue}
                        placeholder="Жишээ: Салон"
                        className="w-full bg-white/[0.02] border border-white/10 p-4 text-sm focus:border-fuchsia-500/50 focus:outline-none transition-all placeholder:text-gray-800"
                      />
                    </div>
                    <div className="group">
                      <label className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-2 group-focus-within:text-fuchsia-500 transition-colors">
                        <MapPin size={12} /> Байршил
                      </label>
                      <input
                        name="location"
                        value={info.location}
                        onChange={handleInputValue}
                        placeholder="Хот, дүүрэг..."
                        className="w-full bg-white/[0.02] border border-white/10 p-4 text-sm focus:border-fuchsia-500/50 focus:outline-none transition-all placeholder:text-gray-800"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <label className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500">
                    <PlusCircle size={12} /> Нүүр зураг
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={fetchFile}
                      className="flex-1 bg-white/[0.02] border border-white/10 p-3 text-xs file:hidden cursor-pointer"
                    />
                    <button
                      onClick={uploadPhoto}
                      disabled={uploading || !file}
                      className="px-6 bg-white/[0.05] border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all disabled:opacity-20"
                    >
                      {uploading ? "..." : "Хадгалах"}
                    </button>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-6 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500">
                      <Clock size={12} /> Ажиллах цагийн хуваарь
                    </label>
                    <span className="text-[8px] font-mono text-fuchsia-500 px-2 py-0.5 border border-fuchsia-500/30">
                      MON-FRI
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <TimePicker
                      label="Нээх"
                      value={info.openTime}
                      onChange={(d) => setInfo((p) => ({ ...p, openTime: d }))}
                      stepMinutes={15}
                      baseDate={baseDate}
                      use12h={false}
                    />
                    <TimePicker
                      label="Хаах"
                      value={info.closeTime}
                      onChange={(d) => setInfo((p) => ({ ...p, closeTime: d }))}
                      stepMinutes={15}
                      baseDate={baseDate}
                      use12h={false}
                    />
                  </div>
                  {timesInvalid && (
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest italic animate-pulse">
                      ⚠ Хаах цаг нээх цагаас хойш байх ёстой
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={createCompany}
                disabled={!canSubmit || isSubmitting}
                className="group w-full flex items-center justify-between bg-white text-black p-6 hover:bg-fuchsia-600 hover:text-white transition-all duration-500 active:scale-[0.98] disabled:opacity-20 disabled:grayscale"
              >
                <span className="text-[11px] font-black uppercase tracking-[0.5em]">
                  {isSubmitting ? "ТҮР ХҮЛЭЭНЭ ҮҮ..." : "БАЙГУУЛЛАГА НЭЭХ"}
                </span>
                <div className="p-2 bg-black/5 rounded-full group-hover:rotate-45 transition-transform text-current">
                  <ArrowUpRight size={20} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="px-6 sm:px-12 lg:px-24 py-12 border-t border-white/[0.05] bg-black">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-gray-600 opacity-50">
          <div className="text-[9px] font-bold uppercase tracking-[0.5em]">
            ©2026 CHRONOS INFRASTRUCTURE
          </div>
          <Globe size={14} />
        </div>
      </footer>
    </div>
  );
}
