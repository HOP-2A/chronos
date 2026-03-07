"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Users,
  Clock,
  MapPin,
  Briefcase,
  Mail,
  Phone,
  Settings,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

type CompanyDetails = {
  id: string;
  name: string;
  typeOfCompany: string;
  location: string;
  openTime: string;
  closeTime: string;
  image: string;
};

type WorkerApplication = {
  id: string;
  workerId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  worker: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    experience: string;
  };
};

export default function AdminDashboard() {
  const { companyId } = useParams();

  const [companyInfo, setCompanyInfo] = useState<CompanyDetails | null>(null);
  const [companyWorkers, setCompanyWorkers] = useState<any[]>([]);
  const [applications, setApplications] = useState<WorkerApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [infoRes, workersRes, appsRes] = await Promise.all([
        fetch(`/api/company/getCompanyInfo/${companyId}`),
        fetch(`/api/worker/getWorkersByCompanyId/${companyId}`),
        fetch(`/api/company/${companyId}/applications?status=PENDING`),
      ]);

      const info = await infoRes.json();
      const workers = await workersRes.json();
      const apps = await appsRes.json();

      setCompanyInfo(info);
      setCompanyWorkers(workers);
      setApplications(apps.applications || []);
    } catch (error) {
      toast.error("Мэдээлэл татахад алдаа гарлаа");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (companyId) fetchData();
  }, [companyId]);

  const formatHHMM = (v?: string | null) => {
    if (!v) return "--:--";
    const s = String(v).trim();

    const m = s.match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return s; 

    const hh = Number(m[1]);
    const mm = Number(m[2]);

    if (!Number.isFinite(hh) || !Number.isFinite(mm)) return s;
    if (hh < 0 || hh > 23 || mm < 0 || mm > 59) return s;

    return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
  };

  const handleDecision = async (
    applicationId: string,
    decision: "ACCEPT" | "REJECT",
  ) => {
    let reason = null;
    if (decision === "REJECT") {
      reason = prompt("Татгалзсан шалтгаан (заавал биш):");
    }

    setIsProcessing(applicationId);
    try {
      const response = await fetch(
        `/api/company/${companyId}/applications/${applicationId}/decide`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ decision, reason, companyId }),
        },
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Алдаа гарлаа");
      }

      toast.success(
        decision === "ACCEPT"
          ? "Ажилтан амжилттай нэмэгдлээ"
          : "Хүсэлтээс татгалзлаа",
      );

      setApplications((prev) => prev.filter((app) => app.id !== applicationId));
      if (decision === "ACCEPT") fetchData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsProcessing(null);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-fuchsia-500/20 border-t-fuchsia-500 rounded-full animate-spin" />
          <p className="text-xs font-bold tracking-[0.3em] text-fuchsia-500 uppercase">
            Chronos Admin
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 selection:bg-fuchsia-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <header className="relative h-[35vh] border-b border-white/5 overflow-hidden">
        {companyInfo?.image ? (
          <img
            src={companyInfo.image}
            className="w-full h-full object-cover opacity-30"
            alt="Cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        <div className="absolute bottom-10 left-6 sm:left-12 lg:left-24 space-y-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 w-fit">
            <ShieldCheck size={12} className="text-fuchsia-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-fuchsia-500">
              Байгууллагын удирдлага
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase italic">
            {companyInfo?.name}
          </h1>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-16 space-y-24">
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
              Элсэх хүсэлтүүд{" "}
              <span className="text-zinc-500 ml-2">
                ({applications.length})
              </span>
            </h2>
          </div>

          {applications.length === 0 ? (
            <div className="py-16 rounded-3xl border border-dashed border-white/5 bg-white/[0.02] flex flex-col items-center justify-center text-zinc-600">
              <AlertCircle size={32} className="mb-4 opacity-20" />
              <p className="text-sm font-medium tracking-wide">
                Шинэ хүсэлт байхгүй байна
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="group relative bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-white/[0.04] transition-all ring-1 ring-transparent hover:ring-fuchsia-500/20"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold italic uppercase tracking-tight text-white">
                      {app.worker.name}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-[11px] text-zinc-500 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Briefcase size={12} /> {app.worker.experience}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Mail size={12} /> {app.worker.email}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Phone size={12} /> {app.worker.phoneNumber}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6 md:mt-0 w-full md:w-auto">
                    <button
                      disabled={!!isProcessing}
                      onClick={() => handleDecision(app.id, "REJECT")}
                      className="flex-1 md:flex-none px-6 py-3 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all disabled:opacity-20"
                    >
                      Татгалзах
                    </button>
                    <button
                      disabled={!!isProcessing}
                      onClick={() => handleDecision(app.id, "ACCEPT")}
                      className="flex-1 md:flex-none px-8 py-3 bg-fuchsia-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-fuchsia-500 shadow-lg shadow-fuchsia-600/20 transition-all disabled:opacity-20"
                    >
                      {isProcessing === app.id ? "Уншиж байна..." : "Зөвшөөрөх"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400">
              Багийн гишүүд ({companyWorkers.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {companyWorkers.map((worker) => (
              <div
                key={worker.id}
                className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl group hover:border-fuchsia-500/30 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center border border-white/5">
                    <Users
                      size={18}
                      className="text-zinc-400 group-hover:text-fuchsia-400 transition-colors"
                    />
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                </div>
                <p className="text-lg font-bold italic uppercase tracking-tight text-white group-hover:text-fuchsia-400 transition-colors">
                  {worker.name}
                </p>
                <p className="text-[10px] text-zinc-500 font-mono tracking-tighter mt-1">
                  {worker.experience}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/5">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-fuchsia-500">
              <Clock size={16} />
              <label className="text-[10px] font-black uppercase tracking-[0.2em]">
                Цагийн хуваарь
              </label>
            </div>
            <p className="text-2xl font-black italic tracking-tighter">
              {formatHHMM(companyInfo?.openTime)}
              <span className="text-zinc-700 mx-2">/</span>
              {formatHHMM(companyInfo?.closeTime)}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-fuchsia-500">
              <MapPin size={16} />
              <label className="text-[10px] font-black uppercase tracking-[0.2em]">
                Байршил
              </label>
            </div>
            <p className="text-lg font-bold italic tracking-tight truncate">
              {companyInfo?.location}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-indigo-600 flex flex-col justify-between group cursor-pointer active:scale-95 transition-all">
            <div className="flex justify-between items-start">
              <Settings size={20} className="text-white/80" />
              <span className="text-[10px] font-black text-white/60">
                EDIT PROFILE
              </span>
            </div>
            <p className="text-xl font-black italic text-white">
              МЭДЭЭЛЭЛ ЗАСАХ
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
