"use client";

import React, { useState, useEffect, use } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as Switch from "@radix-ui/react-switch";
import { ArrowLeft, Save, MapPin, Building2, Loader2 } from "lucide-react";
import Link from "next/link";

export default function CompanyDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const companyId = resolvedParams.id;

  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCompanyInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/company/getCompanyInfo/${companyId}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setCompany(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyInfo();
  }, [companyId]);

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-orange-500" size={48} />
      </div>
    );

  if (error || !company)
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-zinc-400">
        <p className="text-xl font-serif italic mb-4">
          Authority record not found.
        </p>
        <Link href="/superAdmin" className="text-orange-500 underline">
          Return to Terminal
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-8 font-sans animate-in fade-in duration-700">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <Link
          href="/superAdmin"
          className="flex items-center gap-2 text-zinc-500 hover:text-orange-400 transition-colors mb-4 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to Overview</span>
        </Link>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-orange-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-2">
              Detailed Profile: {companyId}
            </p>
            <h1 className="text-5xl font-serif italic text-white">
              {company.name || "Unknown Entity"}
            </h1>
          </div>
          <button className="bg-orange-600 hover:bg-orange-500 text-black font-bold py-3 px-6 rounded-sm flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)]">
            <Save size={18} />
            SAVE CHANGES
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Sidebar */}
        <div className="space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-sm">
            <h3 className="text-zinc-500 text-[10px] font-bold uppercase mb-6 tracking-widest">
              Status & Permissions
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Authority</span>
                <Switch.Root
                  checked={company.isActive}
                  className="w-11 h-6 bg-zinc-700 rounded-full relative data-[state=checked]:bg-orange-500 outline-none cursor-default"
                >
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
              </div>
            </div>
          </div>
        </div>

        {/* Main Forms */}
        <div className="lg:col-span-2">
          <Tabs.Root defaultValue="info">
            <Tabs.List className="flex border-b border-zinc-800 mb-8 gap-8">
              <Tabs.Trigger
                value="info"
                className="pb-4 text-xs font-bold uppercase tracking-widest text-zinc-500 data-[state=active]:text-orange-400 data-[state=active]:border-b-2 data-[state=active]:border-orange-400 transition-all"
              >
                Information
              </Tabs.Trigger>
              <Tabs.Trigger
                value="logs"
                className="pb-4 text-xs font-bold uppercase tracking-widest text-zinc-500 data-[state=active]:text-orange-400 data-[state=active]:border-b-2 data-[state=active]:border-orange-400 transition-all"
              >
                System Logs
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="info" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                    Legal Entity Name
                  </label>
                  <div className="relative">
                    <Building2
                      className="absolute left-3 top-3 text-zinc-600"
                      size={18}
                    />
                    <input
                      type="text"
                      defaultValue={company.name}
                      className="w-full bg-zinc-900 border border-zinc-800 p-3 pl-10 focus:border-orange-500 outline-none transition-colors text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                    Coordinates
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-3 text-zinc-600"
                      size={18}
                    />
                    <input
                      type="text"
                      defaultValue={company.coordinates}
                      className="w-full bg-zinc-900 border border-zinc-800 p-3 pl-10 focus:border-orange-500 outline-none transition-colors text-white"
                    />
                  </div>
                </div>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
}
