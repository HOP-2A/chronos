"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UserType } from "../../../user/[userId]/page";
import { useRouter } from "next/navigation";

export type DayOption =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type Schedule = {
  id: string;
  companyId: string;
  workerId: string;
  day: DayOption;
  startTime: string;
  endTime: string;
};

export default function Page() {
  const params = useParams();
  const workerId = String(params.workerId);
  const [getUser, setGetUser] = useState<UserType>();
  const { push } = useRouter();

  const [day, setDay] = useState<DayOption>("MONDAY");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [workerSchedule, setWorkerSchedule] = useState<Schedule[]>([]);

  const userGet = async () => {
    const response = await fetch(`/api/worker/${workerId}`);
    const res = await response.json();
    setGetUser(res);
  };

  const createSchedule = async () => {
    const res = await fetch("/api/worker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ day, startTime, endTime, workerId }),
    });

    if (res.ok) {
      getWorkerSchedule(workerId);
    }
  };

  const getWorkerSchedule = async (workerId: string) => {
    const res = await fetch("/api/worker/getWorkerSchedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workerId }),
    });

    if (res.ok) {
      const data = await res.json();
      setWorkerSchedule(data);
    }
  };

  useEffect(() => {
    userGet();
    if (workerId) getWorkerSchedule(workerId);
  }, [workerId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1220]">
      <div className="w-full max-w-6xl flex gap-8 px-4">
        <div className="w-1/2 rounded-2xl p-8 space-y-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.25)]">
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
              className="w-full rounded-xl py-3 text-sm font-semibold text-white bg-indigo-500/30 border border-indigo-400/30 hover:bg-indigo-500/50 transition shadow-[0_0_25px_rgba(99,102,241,0.4)]"
            >
              Save Schedule
            </button>
          </div>
        </div>

        <div className="w-1/2 rounded-2xl p-8 bg-white/5 border border-white/10">
          <h3 className="text-2xl font-semibold text-white mb-6">
            Worker Schedule
          </h3>

          {workerSchedule.filter((info) => info.day === day).length === 0 ? (
            <p className="text-lg text-slate-300">
              No schedule found for {day}.
            </p>
          ) : (
            <ul className="space-y-4">
              {workerSchedule
                .filter((info) => info.day === day)
                .map((info) => (
                  <div
                    key={info.id}
                    className="p-4 bg-white/10 border border-white/10 rounded-2xl"
                  >
                    <div className="text-lg text-slate-100 font-semibold">
                      {info.day}
                    </div>
                    <div className="text-lg text-slate-200">
                      {info.startTime} - {info.endTime}
                    </div>
                  </div>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
