"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type DayOption =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

type Schedule = {
  id: string;
  companyId: string;
  workerId: string;
  day: DayOption;
  startTime: string;
  endTime: string;
};

type UserType = any;

export default function Page() {
  const params = useParams();
  const workerId = String(params.workerId);
  const { push } = useRouter();

  const [getUser, setGetUser] = useState<UserType>();
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day,
        startTime,
        endTime,
        workerId,
      }),
    });

    if (res.ok) {
      getWorkerSchedule(workerId);
    }
  };

  const getWorkerSchedule = async (workerId: string) => {
    const res = await fetch("/api/worker/getWorkerSchedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

  const filteredSchedule = workerSchedule.filter((info) => info.day === day);

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        <div className="flex-1 rounded-2xl p-8 space-y-8 bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Add Worker Schedule
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Add time slot for worker
              </p>
            </div>

            <button
              onClick={() => push("/")}
              className="px-4 py-2 text-xs uppercase tracking-widest border border-white/20 rounded-lg hover:bg-white/10 transition"
            >
              Back
            </button>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-gray-600">
              Weekday
            </label>

            <select
              value={day}
              onChange={(e) => setDay(e.target.value as DayOption)}
              className="w-full rounded-xl px-4 py-3 bg-white/10 border border-white/20 text-gray-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-gray-600">
                Start Time
              </label>

              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full rounded-xl px-4 py-3 bg-white/10 border border-white/20 text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-gray-600">
                End Time
              </label>

              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full rounded-xl px-4 py-3 bg-white/10 border border-white/20 text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={createSchedule}
              className="w-full py-3 rounded-xl bg-indigo-500/30 border border-indigo-400/30 hover:bg-indigo-500/50 transition shadow-lg text-sm uppercase tracking-widest"
            >
              Save Schedule
            </button>
          </div>
        </div>
        <div className="flex-1 rounded-2xl p-8 bg-white/5 border border-white/10 backdrop-blur-xl">
          <h3 className="text-2xl font-semibold mb-6 tracking-tight">
            Worker Schedule
          </h3>

          {filteredSchedule.length === 0 ? (
            <p className="text-gray-600">No schedule found for {day}.</p>
          ) : (
            <div className="space-y-4">
              {filteredSchedule.map((info) => (
                <div
                  key={info.id}
                  className="p-5 bg-white/10 border border-white/10 rounded-2xl hover:bg-white/15 transition"
                >
                  <div className="text-lg font-medium text-white">
                    {info.day}
                  </div>

                  <div className="text-lg text-gray-300 font-mono tracking-tight mt-1">
                    {info.startTime} — {info.endTime}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
