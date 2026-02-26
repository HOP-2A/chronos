"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Plus,
  Trash2,
  Building2,
  Utensils,
  Briefcase,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type CompanyInfo = {
  id: string;
  name: string;
  typeOfCompany: string;
  location: string;
  image?: string;
  feedback?: string;
  openTime: Date | null;
  closeTime: Date | null;
  workers: Array<{
    email: string;
    name: string;
    phoneNumber: string;
    experience: string[];
    feedback: string[];
  }>;
};

const Page = () => {
  const [companies, setCompanies] = useState<CompanyInfo[]>([]);
  const { push } = useRouter();

  const getCompanies = async () => {
    try {
      const res = await fetch(`/api/company`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setCompanies(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  };
  const deleteCompany = async (id: string) => {
    await fetch(`/api/company`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ companyId: id }),
    });
    setCompanies(companies.filter((c) => c.id !== id));
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-indigo-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-2">
            <Badge
              variant="outline"
              className="border-indigo-500/30 text-indigo-400 bg-indigo-500/5 px-3 py-1"
            >
              Management Dashboard
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
              Enterprises.
            </h1>
            <p className="text-zinc-500 font-medium max-w-md">
              Monitor and manage your global business infrastructure from a
              centralized interface.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => push(`/createCompany`)}
              className="bg-white text-black hover:bg-zinc-200 h-12 px-6 rounded-full font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-white/5"
            >
              <Plus className="w-4 h-4 mr-2" />
              Register Company
            </Button>
          </div>
        </header>
        <div className="flex items-center gap-2 mb-10 p-1.5 w-fit rounded-full border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-md">
          <Button
            variant="ghost"
            className="rounded-full px-6 h-9 text-xs font-bold hover:bg-zinc-800"
          >
            All
          </Button>
          <Button
            variant="ghost"
            className="rounded-full px-6 h-9 text-xs font-bold text-zinc-500 hover:text-white"
          >
            <Utensils className="w-3 h-3 mr-2" /> Restaurants
          </Button>
          <Button
            variant="ghost"
            className="rounded-full px-6 h-9 text-xs font-bold text-zinc-500 hover:text-white"
          >
            <Briefcase className="w-3 h-3 mr-2" /> Services
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((c) => (
            <Card
              key={c.id}
              className="group relative flex flex-col h-full rounded-[24px] border-zinc-800/50 bg-zinc-900/20 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-zinc-600/50 hover:bg-zinc-900/40"
            >
              <div className="relative aspect-16/10 overflow-hidden">
                <div className="absolute inset-0 z-10 bg-linear-to-t from-[#09090b] via-transparent to-transparent opacity-80" />
                <img
                  src={
                    c.image ||
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
                  }
                  alt={c.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                />
                <Badge className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md border-zinc-700/50 text-zinc-200">
                  {c.typeOfCompany}
                </Badge>
              </div>

              <CardHeader className="p-6 pb-0 grow">
                <div className="flex items-center gap-2 text-indigo-400 mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-widest">
                    {c.location}
                  </span>
                </div>
                <CardTitle className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {c.name}
                </CardTitle>

                <div className="mt-6 p-4 rounded-2xl bg-zinc-950/50 border border-zinc-800/50 group-hover:border-zinc-700/50 transition-colors">
                  <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest block mb-2">
                    Latest Feedback
                  </span>
                  <p className="text-sm text-zinc-400 italic line-clamp-2 leading-relaxed">
                    {c.feedback ||
                      "Awaiting performance review from clients..."}
                  </p>
                </div>
              </CardHeader>

              <div className="p-6 mt-auto flex flex-col gap-3">
                <Button className="w-full bg-zinc-100 text-black hover:bg-white h-11 rounded-xl font-bold shadow-lg shadow-black/20">
                  Analytics & Details
                </Button>

                <Button
                  variant="ghost"
                  className="w-full text-zinc-500 hover:text-red-400 hover:bg-red-500/5 h-10 rounded-xl transition-all"
                  onClick={() => deleteCompany(c.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Terminate Listing
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {companies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-zinc-800 rounded-[32px]">
            <Building2 className="w-12 h-12 text-zinc-700 mb-4" />
            <p className="text-zinc-500 font-medium">
              No active companies found in the database.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;