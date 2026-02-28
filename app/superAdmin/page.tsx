import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/db";
import {
  UserCheck,
  Calendar,
  Zap,
  ArrowRight,
  Globe,
  LayoutDashboard,
  Cpu,
  Fingerprint,
} from "lucide-react";

export default async function Page() {
  const admin = await requireAdmin();

  const [companyCount, workerCount, userCount, scheduleCount] =
    await Promise.all([
      prisma.company.count(),
      prisma.worker.count(),
      prisma.user.count(),
      prisma.timeSchedule.count(),
    ]);

  const recentCompanies = await prisma.company.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-amber-500/30 font-sans overflow-x-hidden">
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-amber-600/10 blur-[160px] rounded-none pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/5 blur-[120px] rounded-none pointer-events-none z-0" />

      <div className="relative flex flex-col lg:flex-row min-h-screen z-10">
        <aside className="w-full lg:w-72 border-r border-amber-500/10 bg-black/40 backdrop-blur-md">
          <div className="flex flex-col h-full">
            <div className="p-8 border-b border-amber-500/10 bg-amber-500/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  <Fingerprint size={14} className="text-amber-500" />
                </div>
                <span className="font-black tracking-[0.2em] text-sm uppercase italic">
                  CHRONOS
                </span>
              </div>
            </div>

            <nav className="p-4 space-y-1">
              <SidebarItem
                icon={<LayoutDashboard size={18} />}
                label="System Overview"
                active
              />
              <SidebarItem
                icon={<UserCheck size={18} />}
                label="Elite Workers"
              />
              <SidebarItem
                icon={<Calendar size={18} />}
                label="Live Schedules"
              />
            </nav>

            <div className="mt-auto p-8 border-t border-amber-500/10">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-500/40">
                <Cpu size={12} /> Core Engine Active
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-8 lg:p-16">
          <header className="max-w-7xl mx-auto mb-20 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-amber-500/20 bg-amber-500/5 text-amber-500 text-[9px] font-black uppercase tracking-[0.3em] mb-6">
              <Zap size={10} fill="currentColor" /> Authorized Admin Terminal
            </div>

            <h1 className="text-6xl md:text-8xl font-serif italic leading-none tracking-tighter text-white">
              Admin <br />
              <span className="font-sans font-black not-italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-500 to-yellow-600">
                Authority.
              </span>
            </h1>
          </header>

          <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-amber-500/10 border border-amber-500/10 mb-24 shadow-2xl">
            <MetricBox label="Нийт Компаниуд" value={companyCount} />
            <MetricBox label="Ажилтаны Тоо" value={workerCount} />
            <MetricBox label="Нийт Хэрэглэгчид" value={userCount} />
            <MetricBox label="Цагийн Хуваариуд" value={scheduleCount} />
          </section>

          <section className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-10">
              <div className="pl-4 border-l-2 border-amber-500">
                <h2 className="text-2xl font-black tracking-tighter uppercase">
                  Recent Activity
                </h2>
              </div>
            </div>

            <div className="border border-white/5 bg-zinc-950/20">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-amber-500/10 bg-amber-500/[0.02]">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/50">
                      Sector Name
                    </th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/50">
                      Coordinates
                    </th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/50 text-right">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentCompanies.map((c) => (
                    <tr
                      key={c.id}
                      className="group hover:bg-amber-500/[0.03] transition-colors"
                    >
                      <td className="px-8 py-8 font-serif italic text-2xl group-hover:text-amber-400 transition-colors">
                        {c.name}
                      </td>
                      <td className="px-8 py-8 text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                        {c.location || "NON_SPATIAL"}
                      </td>
                      <td className="px-8 py-8 text-right">
                        <div className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-amber-500">
                          Configure <ArrowRight size={14} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      <footer className="py-10 px-12 border-t border-amber-500/10 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.5em]">
            System: Chronos Auth // Admin Layer
          </div>
          <div className="flex items-center gap-3 text-amber-500/40 text-[9px] font-black uppercase tracking-widest">
            <Globe size={12} /> Pinecone Academy
          </div>
        </div>
      </footer>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: any;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 px-6 py-4 cursor-pointer transition-all duration-200 border-l-2 ${
        active
          ? "bg-amber-500/10 border-amber-500 text-amber-400"
          : "border-transparent text-zinc-500 hover:text-white hover:bg-white/5"
      }`}
    >
      {icon}
      <span className="text-[10px] font-black uppercase tracking-[0.2em]">
        {label}
      </span>
    </div>
  );
}

function MetricBox({
  label,
  value,
  active = false,
}: {
  label: string;
  value: number;
  active?: boolean;
}) {
  return (
    <div
      className={`bg-black p-10 flex flex-col justify-between group transition-all duration-500 ${
        active ? "ring-1 ring-inset ring-amber-500/20" : ""
      }`}
    >
      <div>
        <p className="text-[9px] font-black text-amber-500/40 uppercase tracking-[0.3em] mb-4">
          {label}
        </p>
        <h3 className="text-5xl font-black text-white italic tracking-tighter">
          {value.toString().padStart(2, "0")}
        </h3>
      </div>
      <div
        className={`mt-10 h-[2px] w-full transition-all duration-700 ${
          active
            ? "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
            : "bg-zinc-900 group-hover:bg-amber-900"
        }`}
      />
    </div>
  );
}
