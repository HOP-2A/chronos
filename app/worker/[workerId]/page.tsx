"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type DayOption =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export default function Page() {
  const params = useParams();
  const workerId = params.workerId;

  const [day, setDay] = useState<DayOption>("MONDAY");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [loading, setLoading] = useState(false);

  const createSchedule = async () => {
    if (!workerId) {
      toast.error("Worker ID missing");
      return;
    }

    if (startTime >= endTime) {
      toast.error("End time must be later than start time");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/worker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        day,
        startTime,
        endTime,
        workerId,
      }),
    });

    setLoading(false);

    if (res.status === 201) {
      toast.success("Schedule created successfully");
    } else if (res.status === 409) {
      toast.error("Schedule already exists");
    } else {
      toast.error("Failed to create schedule");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1220]">
      <div className="max-w-xl w-full rounded-2xl p-8 space-y-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.25)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Add Worker Schedule
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Add a time slot for this worker
            </p>
          </div>

          <button
            onClick={() => window.history.back()}
            className="px-3 py-1.5 text-sm rounded-lg border border-white/20 text-slate-300 hover:bg-white/10 transition"
          >
            ← Back
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Weekday
            </label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value as DayOption)}
              className="w-full rounded-xl px-4 py-3 bg-white/10 border border-white/20 text-slate-200 text-sm backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              {[
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY",
                "SUNDAY",
              ].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full rounded-xl px-4 py-3 bg-white/10 border border-white/20 text-slate-200 text-sm backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full rounded-xl px-4 py-3 bg-white/10 border border-white/20 text-slate-200 text-sm backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <button
            onClick={createSchedule}
            disabled={loading}
            className="w-full rounded-xl py-3 text-sm font-semibold text-white bg-indigo-500/30 border border-indigo-400/30 hover:bg-indigo-500/50 transition shadow-[0_0_25px_rgba(99,102,241,0.4)]"
          >
            {loading ? "Saving..." : "Save Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
}
