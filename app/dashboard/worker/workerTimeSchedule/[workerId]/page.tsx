"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  slotInterval: number;
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
  const [slotInterval, setSlotInterval] = useState(60);

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
        slotInterval,
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
    if (!workerId) return;
    userGet();
    getWorkerSchedule(workerId);
  }, [workerId]);

  const filteredSchedule = workerSchedule.filter((info) => info.day === day);

  const generateSlots = (
    startTime: string,
    endTime: string,
    interval: number,
  ) => {
    const slots = [];

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const current = new Date();
    current.setHours(startHour, startMinute, 0, 0);

    const end = new Date();
    end.setHours(endHour, endMinute, 0, 0);

    while (current < end) {
      slots.push(current.toTimeString().slice(0, 5));
      current.setMinutes(current.getMinutes() + interval);
    }

    return slots;
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-gray-100 font-sans flex flex-col">
      <nav className="w-full p-6 border-b border-white/[0.05] flex justify-between items-center bg-[#0A0A0A]">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
            Scheduling System
          </span>
        </div>
        <button
          onClick={() => push("/")}
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition"
        >
          Close
        </button>
      </nav>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-[450px] p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-white/[0.05] space-y-12 overflow-y-auto">
          <header>
            <h1 className="text-4xl font-semibold tracking-tighter text-white mb-2">
              Configure
            </h1>
            <p className="text-sm text-gray-500">
              Define operational time slots and intervals.
            </p>
          </header>
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
                Weekday
              </label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value as DayOption)}
                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-4 text-sm text-gray-200 focus:ring-1 focus:ring-white/20 outline-none transition appearance-none"
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
                  <option key={d} value={d} className="bg-[#111111]">
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
                  Start
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-4 text-sm text-gray-200 focus:ring-1 focus:ring-white/20 outline-none"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
                  End
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-4 text-sm text-gray-200 focus:ring-1 focus:ring-white/20 outline-none"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
                Interval (Minutes)
              </label>
              <input
                type="number"
                value={slotInterval}
                onChange={(e) => setSlotInterval(Number(e.target.value))}
                placeholder="60"
                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-4 text-sm text-gray-200 focus:ring-1 focus:ring-white/20 outline-none"
              />
            </div>
          </div>
          <button
            onClick={createSchedule}
            className="w-full py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-gray-200 transition-all active:scale-[0.98] shadow-lg shadow-white/5"
          >
            Save Schedule
          </button>
        </div>
        <div className="flex-1 bg-[#0A0A0A] p-8 sm:p-12 overflow-y-auto">
          <header className="flex justify-between items-end mb-12 border-b border-white/[0.05] pb-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-white">
                Timeline View
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                {day} generated slots
              </p>
            </div>
            <div className="text-[10px] font-mono text-gray-700 uppercase tracking-widest">
              {filteredSchedule.length > 0 ? "Status: Active" : "Status: Empty"}
            </div>
          </header>
          {filteredSchedule.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center border border-dashed border-white/[0.05] rounded-2xl opacity-50">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
                No active slots found
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-px bg-white/[0.05] border border-white/[0.05]">
              {filteredSchedule.map((info) => {
                const slots = generateSlots(
                  info.startTime,
                  info.endTime,
                  info.slotInterval ?? 60,
                );
                return slots.map((slot, index) => (
                  <div
                    key={index}
                    className="bg-[#0A0A0A] p-8 flex flex-col items-center justify-center group hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.2em] mb-3 group-hover:text-emerald-500 transition-colors">
                      Time Slot
                    </span>
                    <span className="text-3xl font-light text-white font-mono tracking-tighter">
                      {slot}
                    </span>
                  </div>
                ));
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
