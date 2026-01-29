"use client";

import React, { use, useState } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ workerId: string }>;
}) {
  const { workerId } = use(params);

  const [day, setDay] = useState("MONDAY");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [companyId, setCompanyId] = useState("");

  const weekDays = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];
    const startDateTime = `${today}T${startTime}:00.000Z`;
    const endDateTime = `${today}T${endTime}:00.000Z`;

    const res = await fetch(`/api/worker/${workerId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        day,
        startTime: startDateTime,
        endTime: endDateTime,
        workerId,
        companyId,
      }),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-cyan-300">
      <div className="w-full max-w-md rounded-2xl border border-cyan-500/30 bg-black/60 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.25)] p-8">
        <h1 className="text-2xl font-bold tracking-widest text-center mb-6 text-cyan-400">
          WORKER SCHEDULER
        </h1>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="text-xs uppercase tracking-widest text-cyan-500">
              Company ID
            </label>
            <input
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className="w-full mt-1 bg-black border border-cyan-500/40 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="company id"
              required
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-cyan-500">
              Day
            </label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full mt-1 bg-black border border-cyan-500/40 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500 text-cyan-300"
            >
              {weekDays.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-cyan-500">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full mt-1 bg-black border border-cyan-500/40 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-cyan-500">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full mt-1 bg-black border border-cyan-500/40 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-xl font-semibold tracking-widest bg-cyan-500 text-black hover:bg-cyan-400 transition shadow-[0_0_20px_rgba(34,211,238,0.6)] disabled:opacity-50"
          ></button>
        </form>
      </div>
    </div>
  );
}
