"use client";

import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  Activity,
  Search,
  Bell,
  CircleUser,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import { CompanyType } from "../../user/[userId]/page";

type WorkerType = {
  id: string;
  name: string;
  email: string;
  experience: string;
  clerkId: string;
  companyId: string;
  feedback: string[];
  phoneNumber: number;
  profilePicture: string;
};

export default function WorkerPanel() {
  const { push } = useRouter();
  const params = useParams();
  const workerId = params.workerId;
  const [worker, setWorker] = useState<WorkerType>();
  const [company, setCompany] = useState<CompanyType[]>([]);
  const [timeSchedule, setTimeSchedule] = useState();

  const getWorker = async () => {
    const res = await fetch(`/api/worker/${workerId}`);
    const response = await res.json();
    setWorker(response);
  };

  const getWorkerCompany = async () => {
    const res = await fetch("/api/company");
    const response = await res.json();
    setCompany(response);
  };

  const getTimeSchedule = async () => {
    const res = await fetch("/api/worker/getWorkerSchedule", {
      method: "POST",
      body: JSON.stringify({ workerId: worker?.id }),
    });
    const response = await res.json();
    setTimeSchedule(response);
  };

  useEffect(() => {
    getWorker();
    getWorkerCompany();
    getTimeSchedule();
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-slate-200 font-sans">
      <aside className="w-64 border-r border-purple-900/30 bg-black/50 backdrop-blur-xl p-6 flex flex-col gap-8">
        <div className="flex items-center gap-2 px-2">
          <div className="h-8 w-8 rounded-lg bg-purple-600 shadow-[0_0_15px_rgba(147,51,234,0.5)]" />
          <span className="text-xl font-bold tracking-tight text-white">
            CORE<span className="text-purple-500">.io</span>
          </span>
        </div>

        <nav className="flex flex-col gap-2">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active
          />
          <div onClick={() => push(`/dashboard/worker/${workerId}/profile`)}>
            <NavItem icon={<Users size={20} />} label="Workers" />
          </div>
          <div onClick={() => push(`/dashboard/worker/${workerId}`)}>
            <NavItem icon={<Activity size={20} />} label="Analytics" />
          </div>
          <div onClick={() => push(`/dashboard/worker/${workerId}/settings`)}>
            <NavItem icon={<Settings size={20} />} label="Settings" />
          </div>
        </nav>
      </aside>
      ;{/* --- Main Content --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                {worker?.name}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                className="bg-purple-950/20 border border-purple-900/30 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                placeholder="Search metrics..."
              />
            </div>
            <button className="p-2 rounded-full bg-purple-900/20 border border-purple-800/40 text-purple-400 hover:bg-purple-800/30 transition-colors">
              <Bell size={20} />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 h-60">
          <Card className="bg-gradient-to-br from-purple-950/20 to-black border-purple-900/30">
            <CardContent className="text-white ">
              <div className="flex text-white justify-start">
                <img
                  className="aspect-square object-cover w-10 h-10 border-2 rounded-full border-border"
                  src={worker?.profilePicture}
                />
                <div className="ml-3 mt-2">{worker?.name}</div>
              </div>
              <hr className=" mt-4  " />
              <p className="text-white mt-4">
                Утасны дугаар: {worker?.phoneNumber}
              </p>
              <div>
                Ажлын туршлага:
                <span className="text-xs font-mono text-purple-500 bg-purple-500/10 px-2 py-1 rounded">
                  {worker?.experience}
                </span>
              </div>
              <div>Санал хүсэлт: {worker?.feedback[0]}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-950/20 to-black border-purple-900/30">
            <CardContent className="">
              <div className="flex text-white justify-start">
                <div className="mr-3 mt-1">{worker?.name}</div>
              </div>
              <p className="text-sm text-slate-500 mb-1"></p>
              <div className="flex items-end justify-between">
                <h2 className={"text-3xl font-bold "}></h2>
                <span className="text-xs font-mono text-purple-500 bg-purple-500/10 px-2 py-1 rounded"></span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table Section */}
        <Card className="bg-black/40 border-purple-900/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-purple-100 text-lg">
              Recent Worker Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="border-purple-900/50">
                <TableRow>
                  <TableHead className="text-purple-400/70">ID</TableHead>
                  <TableHead className="text-purple-400/70">
                    Worker Name
                  </TableHead>
                  <TableHead className="text-purple-400/70">Status</TableHead>
                  <TableHead className="text-purple-400/70 text-right">
                    Uptime
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <WorkerRow
                  id="#WRK-001"
                  name="Alpha-Node"
                  status="Active"
                  uptime="14d 2h"
                />
                <WorkerRow
                  id="#WRK-042"
                  name="Omega-Stream"
                  status="Standby"
                  uptime="02d 5h"
                />
                <WorkerRow
                  id="#WRK-099"
                  name="Zeta-Core"
                  status="Error"
                  uptime="-- --"
                />
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

// --- Sub-components for cleaner code ---

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`
      flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200
      ${
        active
          ? "bg-purple-600/20 text-purple-400 border border-purple-500/30 shadow-[inset_0_0_10px_rgba(168,85,247,0.1)]"
          : "text-slate-500 hover:text-purple-300 hover:bg-purple-900/10"
      }
    `}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}

function WorkerRow({
  id,
  name,
  status,
  uptime,
}: {
  id: string;
  name: string;
  status: string;
  uptime: string;
}) {
  const statusColors: any = {
    Active: "bg-purple-500/20 text-purple-400 border-purple-500/50",
    Standby: "bg-slate-800 text-slate-400 border-slate-700",
    Error: "bg-red-950/30 text-red-500 border-red-900/50",
  };

  return (
    <TableRow className="border-purple-900/20 hover:bg-purple-900/5 transition-colors">
      <TableCell className="font-mono text-xs text-slate-500">{id}</TableCell>
      <TableCell className="font-medium text-slate-200">{name}</TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={`${statusColors[status]} font-normal`}
        >
          {status}
        </Badge>
      </TableCell>
      <TableCell className="text-right text-slate-400 font-mono text-sm">
        {uptime}
      </TableCell>
    </TableRow>
  );
}
