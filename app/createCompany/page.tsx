"use client";

import * as React from "react";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, MapPin, Briefcase, Clock, PlusCircle } from "lucide-react";

import { upload } from "@vercel/blob/client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { TimePicker } from "../_component/TimePicker";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type CompanyInfo = {
  name: string;
  typeOfCompany: string;
  location: string;
  openTime: string;
  closeTime: string;
  image: string;
  adminId: string;
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
    openTime: "",
    closeTime: "",
    image: "",
    adminId: "",
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
        openTime: info.openTime,
        closeTime: info.closeTime,
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
    info.openTime && info.closeTime && info.closeTime <= info.openTime;

  const canSubmit =
    info.name.trim() &&
    info.typeOfCompany.trim() &&
    info.location.trim() &&
    info.openTime !== "" &&
    info.closeTime !== "" &&
    !timesInvalid;

  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-[#0f1014]">
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
            onClick={() => push("/dashboard/worker/workerCompanies")}
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
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url('${BG_URL}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/60 to-blue-900/20" />

      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />

      <div className="relative mx-auto flex min-h-screen max-w-4xl items-center justify-center p-6">
        <Card className="w-full max-w-xl border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
          <CardHeader className="space-y-3 pb-8 text-center sm:text-left">
            <div className="mx-auto sm:mx-0 w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20 mb-2">
              <PlusCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-3xl font-black tracking-tight text-white uppercase italic">
                Create{" "}
                <span className="text-purple-500 font-black">Company</span>
              </CardTitle>
              <CardDescription className="text-gray-400 font-medium">
                Start your journey by setting up your business profile
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-5">
              <div className="space-y-2 group">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 group-focus-within:text-blue-400 transition-colors flex items-center gap-2">
                  <Building2 className="w-3 h-3" /> Company name
                </label>
                <Input
                  name="companyName"
                  value={info.name}
                  onChange={handleInputValue}
                  placeholder="e.g. Paradox Barbers"
                  className="h-12 border-white/5 bg-white/5 text-white placeholder:text-gray-600 focus:bg-white/10 focus:ring-1 focus:ring-blue-500/50 transition-all rounded-xl"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 group-focus-within:text-blue-400 transition-colors flex items-center gap-2">
                  <Briefcase className="w-3 h-3" /> Business Type
                </label>
                <Input
                  name="companyType"
                  value={info.typeOfCompany}
                  onChange={handleInputValue}
                  placeholder="e.g. Barbershop, Repair Shop"
                  className="h-12 border-white/5 bg-white/5 text-white placeholder:text-gray-600 focus:bg-white/10 focus:ring-1 focus:ring-blue-500/50 transition-all rounded-xl"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 group-focus-within:text-blue-400 transition-colors flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Location
                </label>
                <Input
                  name="location"
                  value={info.location}
                  onChange={handleInputValue}
                  placeholder="e.g. Sukhbaatar District, UB"
                  className="h-12 border-white/5 bg-white/5 text-white placeholder:text-gray-600 focus:bg-white/10 focus:ring-1 focus:ring-blue-500/50 transition-all rounded-xl"
                />
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <Input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={fetchFile}
                    placeholder="image"
                    className="h-12 border-white/5 bg-white/5 text-white placeholder:text-gray-600 focus:bg-white/10 focus:ring-1 focus:ring-blue-500/50 transition-all rounded-xl"
                  />
                </div>
                <div>
                  <Button
                    type="button"
                    onClick={uploadPhoto}
                    className="h-12.5 rounded-xl  border-white/5 "
                  >
                    save
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-5">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Clock className="w-3 h-3" /> Business hours
                </p>
                <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full font-bold border border-blue-500/20">
                  MON – FRI
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2 group">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">
                    Opening At (24h)
                  </label>
                  <Input
                    type="time"
                    name="openTime"
                    step="60"
                    value={info.openTime}
                    onChange={(e) =>
                      setInfo((p) => ({ ...p, openTime: e.target.value }))
                    }
                    className="h-12 border-white/5 bg-white/5 text-white focus:bg-white/10 focus:ring-1 focus:ring-blue-500/50 transition-all rounded-xl [color-scheme:dark] appearance-none"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">
                    Closing At (24h)
                  </label>
                  <Input
                    type="time"
                    name="closeTime"
                    step="60"
                    value={info.closeTime}
                    onChange={(e) =>
                      setInfo((p) => ({ ...p, closeTime: e.target.value }))
                    }
                    className="h-12 border-white/5 bg-white/5 text-white focus:bg-white/10 focus:ring-1 focus:ring-blue-500/50 transition-all rounded-xl [color-scheme:dark] appearance-none"
                  />
                </div>
              </div>

              {timesInvalid && (
                <p className="text-[11px] text-red-400 font-medium flex items-center gap-1">
                  ⚠ Close time must be after open time
                </p>
              )}
            </div>
            <div className="pt-2">
              <Button
                className="w-full h-12 bg-blue-600 text-white hover:bg-blue-500 active:scale-[0.98] transition-all rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-blue-600/30 disabled:opacity-30"
                onClick={createCompany}
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Launch Company"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
