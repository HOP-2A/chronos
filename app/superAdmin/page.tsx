import { requireAdmin } from "@/lib/require-admin";

const Page = async () => {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(99,102,241,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(45%_35%_at_20%_20%,rgba(16,185,129,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(45%_35%_at_80%_35%,rgba(244,63,94,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.65))]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* top bar */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-10 w-10 rounded-2xl border border-white/10 bg-white/5 p-[2px] shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <div className="h-full w-full rounded-[14px] bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.35),transparent_60%),radial-gradient(circle_at_80%_60%,rgba(16,185,129,0.22),transparent_60%),linear-gradient(to_bottom,rgba(255,255,255,0.10),rgba(255,255,255,0.02))]" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                admin console
              </h1>
              <p className="text-sm text-zinc-400">
                companies • workers • users
              </p>
            </div>
          </div>
        </header>

        {/* layout */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[290px_1fr]">
          {/* sidebar */}
          <aside className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_1px_0_0_rgba(255,255,255,0.06)]">
            <div className="flex items-center justify-between px-2 py-2">
              <div className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                navigation
              </div>
            </div>

            <nav className="mt-1 space-y-1">
              <NavItem
                icon={<GridIcon className="h-4 w-4" />}
                label="overview"
                active
              />
              <div className="my-3 h-px bg-white/10" />
              <NavItem
                icon={<ShieldIcon className="h-4 w-4" />}
                label="roles & access"
              />
            </nav>
          </aside>

          {/* main */}
          <main className="space-y-6">
            {/* schema-aligned metrics */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard title="companies" value="0" hint="Company[]" />
              <MetricCard title="workers" value="0" hint="Worker[]" />
              <MetricCard title="users" value="0" hint="User[]" />
              <MetricCard title="schedules" value="0" hint="TimeSchedule" />
            </section>

            {/* company + scheduler focus */}
            <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              {/* companies panel */}
              <div className="rounded-2xl border border-white/10 bg-white/5 shadow-[0_1px_0_0_rgba(255,255,255,0.06)]">
                <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-base font-semibold tracking-tight">
                      Companies
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button className="h-9 rounded-xl border border-indigo-500/30 bg-indigo-500/15 px-3 text-sm text-indigo-100 shadow-[0_0_0_1px_rgba(99,102,241,0.20)] transition hover:bg-indigo-500/20 active:scale-[0.99]">
                      Create Company
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  {/* table shell - no rows */}
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                    <div className="flex justify-between border-b border-white/10 px-4 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                      <div>name</div>
                      <div>company type</div>
                      <div>location</div>
                      <div>owner</div>
                    </div>
                    <div className="px-4 py-10 text-center">
                      <div className="mx-auto grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
                        <BuildingIcon className="h-5 w-5 text-zinc-200" />
                      </div>
                      <div className="mt-3 text-sm font-semibold text-zinc-100">
                        No companies yet!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 0%; }
          100% { background-position: -200% 0%; }
        }
      `}</style>
    </div>
  );
};

export default Page;

/* -------------------- ui pieces (no external deps) -------------------- */

function NavItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={[
        "group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition",
        active
          ? "border border-white/10 bg-white/10 text-zinc-50 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
          : "border border-transparent text-zinc-300 hover:border-white/10 hover:bg-white/[0.07]",
      ].join(" ")}
    >
      <span
        className={[
          "grid h-8 w-8 place-items-center rounded-xl border border-white/10 transition",
          active ? "bg-white/10" : "bg-white/5 group-hover:bg-white/[0.08]",
        ].join(" ")}
      >
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      <ChevronRightIcon className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400" />
    </button>
  );
}

function MetricCard({
  title,
  value,
  hint,
}: {
  title: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_1px_0_0_rgba(255,255,255,0.06)]">
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium uppercase tracking-wider text-zinc-400">
          {title}
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-zinc-300">
          {hint}
        </div>
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-2/5 rounded-full bg-white/20" />
      </div>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-200">
              {icon}
            </span>
            <div className="text-sm font-semibold text-zinc-100">{title}</div>
          </div>
          <div className="mt-1 text-xs text-zinc-500">{subtitle}</div>
        </div>
        <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-zinc-300">
          —
        </span>
      </div>

      <div className="mt-4 space-y-2">{children}</div>
    </div>
  );
}

function KeyValueRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
      <div className="text-xs uppercase tracking-wider text-zinc-500">{k}</div>
      <div className="text-xs font-medium text-zinc-200">{v}</div>
    </div>
  );
}

function MiniRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
      <div className="text-xs uppercase tracking-wider text-zinc-500">
        {label}
      </div>
      <div className="text-xs font-medium text-zinc-200">{value}</div>
    </div>
  );
}

function DayRow({ day }: { day: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2">
      <div className="w-24 text-xs font-semibold uppercase tracking-wider text-zinc-300">
        {day}
      </div>
      <div className="flex-1">
        <div className="h-9 w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
          <div className="h-full w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.08)_20%,rgba(255,255,255,0.04)_40%)] [background-size:200%_100%] animate-[shimmer_1.6s_infinite]" />
        </div>
      </div>
      <button className="h-9 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-zinc-200 transition hover:bg-white/[0.08] active:scale-[0.99]">
        edit
      </button>
    </div>
  );
}

function AccessCard({
  title,
  subtitle,
  icon,
  right,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  right: string;
}) {
  return (
    <button className="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left shadow-[0_1px_0_0_rgba(255,255,255,0.06)] transition hover:bg-white/[0.06] active:scale-[0.99]">
      <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 transition group-hover:bg-white/[0.08]">
        {icon}
      </span>

      <span className="flex-1">
        <span className="block text-sm font-semibold text-zinc-100">
          {title}
        </span>
        <span className="block text-xs text-zinc-400">{subtitle}</span>
      </span>

      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-zinc-200">
        {right}
        <ChevronRightIcon className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400" />
      </span>
    </button>
  );
}

/* -------------------- icons (inline svg) -------------------- */

function Icon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </Icon>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </Icon>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </Icon>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M4 4h7v7H4z" />
      <path d="M13 4h7v7h-7z" />
      <path d="M4 13h7v7H4z" />
      <path d="M13 13h7v7h-7z" />
    </Icon>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M3 8h18" />
      <path d="M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
    </Icon>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M17 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <path d="M10 11a4 4 0 100-8 4 4 0 000 8z" />
      <path d="M22 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </Icon>
  );
}

function CogIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M12 15.5A3.5 3.5 0 1112 8.5a3.5 3.5 0 010 7z" />
      <path d="M19.4 15a1.8 1.8 0 00.36 1.98l.04.04a2.2 2.2 0 01-1.56 3.76 2.2 2.2 0 01-1.56-.64l-.04-.04A1.8 1.8 0 0015 19.4a1.8 1.8 0 00-1.02.31 1.8 1.8 0 00-.79.71l-.02.04A2.2 2.2 0 019 20.8a2.2 2.2 0 01-2.18-2.66l.02-.04A1.8 1.8 0 006 15a1.8 1.8 0 00-.31-1.02 1.8 1.8 0 00-.71-.79l-.04-.02A2.2 2.2 0 013.2 9a2.2 2.2 0 012.66-2.18l.04.02A1.8 1.8 0 009 6a1.8 1.8 0 001.02-.31 1.8 1.8 0 00.79-.71l.02-.04A2.2 2.2 0 0115 3.2a2.2 2.2 0 012.18 2.66l-.02.04A1.8 1.8 0 0018 9c0 .36.1.7.31 1.02.2.31.48.56.83.73" />
    </Icon>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </Icon>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M9 18l6-6-6-6" />
    </Icon>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M3 21V7a2 2 0 012-2h6v16" />
      <path d="M13 21V3h6a2 2 0 012 2v16" />
      <path d="M7 9h1" />
      <path d="M7 12h1" />
      <path d="M7 15h1" />
      <path d="M17 9h1" />
      <path d="M17 12h1" />
      <path d="M17 15h1" />
    </Icon>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M10 7V6a2 2 0 012-2h0a2 2 0 012 2v1" />
      <path d="M4 7h16v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" />
      <path d="M4 12h16" />
    </Icon>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M12 22a10 10 0 110-20 10 10 0 010 20z" />
      <path d="M12 6v6l4 2" />
    </Icon>
  );
}

function IdIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M4 7h16" />
      <path d="M4 17h16" />
      <path d="M7 10h4" />
      <path d="M7 14h6" />
      <path d="M15 10h2" />
      <path d="M15 14h2" />
    </Icon>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M10 13a5 5 0 007.07 0l1.41-1.41a5 5 0 000-7.07 5 5 0 00-7.07 0L10.7 5.2" />
      <path d="M14 11a5 5 0 01-7.07 0L5.52 9.59a5 5 0 010-7.07 5 5 0 017.07 0L13.3 3.2" />
    </Icon>
  );
}
