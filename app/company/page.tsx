"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
type CompanyInfo = {
  name: string;
  typeOfCompany: string;
  location: string;

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

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
const Page = () => {
  const [company, setCompany] = useState<CompanyInfo>([]);
  const { push } = useRouter();
  const getCompanies = async () => {
    const res = await fetch(`/api/company`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch companies");
    }
    const data = await res.json();
    setCompany(data);
  };
  const pushToCreateCompany = () => {
    push(`/createCompany`);
  };
  console.log(company.id);
  const deleteCompany = async (id) => {
    await fetch(`/api/company`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ companyId: id }),
    });
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCompanies();
  }, []);
    return (
      <div className="relative min-h-screen bg-zinc-950 text-zinc-100">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex justify-center pt-10">
            <p className="text-4xl text-white font-extrabold tracking-tighter">
              Company
            </p>
          </div>

          <div className="flex justify-center mt-10 gap-4">
            <Button
              variant="outline"
              className="border-zinc-800 bg-zinc-900/50 backdrop-blur-md text-white hover:bg-zinc-800"
            >
              Restaurant
            </Button>
            <Button
              variant="outline"
              className="border-zinc-800 bg-zinc-900/50 backdrop-blur-md text-white hover:bg-zinc-800"
            >
              Service
            </Button>
            <Button
              onClick={pushToCreateCompany}
              className="bg-indigo-600 hover:bg-indigo-500 text-white border-none shadow-lg shadow-indigo-900/20 font-bold transition-all active:scale-95"
            >
              Create Company
            </Button>
          </div>

          <div className="mt-16 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto pb-20">
            {company.map((c) => (
              <Card
                key={c.id}
                className="relative w-full max-w-sm rounded-2xl overflow-hidden border-zinc-800 bg-zinc-900/40 backdrop-blur-xl shadow-2xl transition-all hover:border-zinc-700 hover:translate-y-[-4px]"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                  <img
                    src="https://avatar.vercel.sh/shadcn1"
                    alt="Event cover"
                    className="w-full h-full object-cover brightness-50"
                  />
                </div>

                <CardHeader className="p-6">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 backdrop-blur-sm">
                      {c.typeOfCompany}
                    </Badge>
                    <div className="flex items-center gap-1 text-zinc-500">
                      <MapPin className="w-3 h-3" />
                      <span className="text-[10px] font-medium">
                        {c.location}
                      </span>
                    </div>
                  </div>

                  <CardTitle className="mt-4">
                    <span className="text-2xl font-bold text-white tracking-tight leading-none">
                      {c.name}
                    </span>
                  </CardTitle>

                  <div className="mt-4 space-y-4">
                    <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/50">
                      <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-1">
                        Feedback
                      </p>
                      <p className="text-sm text-zinc-300 italic line-clamp-2">
                        "{c.feedback || "No feedback yet..."}"
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <div className="px-6 pb-6 space-y-3">
                  <Button className="w-full bg-white text-black hover:bg-zinc-200 font-bold rounded-xl transition-colors">
                    View Company
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 h-9 text-xs"
                    onClick={() => deleteCompany(c.id)}
                  >
                    Delete Company
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
};

export default Page;
