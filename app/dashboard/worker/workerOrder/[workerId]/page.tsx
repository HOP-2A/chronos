"use client";

import { useParams } from "next/navigation";
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

export default function Page() {
  const params = useParams();
  const workerId = String(params.workerId);

  const [workerSchedule, setWorkerSchedule] = useState<Schedule[]>([]);
  const [workerInfo, setWorkerInfo] = useState<any>(null);
  const [day, setDay] = useState<DayOption>("MONDAY");
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null,
  );

  const getWorkerSchedule = async (workerId: string) => {
    try {
      const res = await fetch("/api/worker/getWorkerSchedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId }),
      });

      if (res.ok) {
        const data = await res.json();
        setWorkerSchedule(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const workerDetails = async (workerId: string) => {
    const res = await fetch(`/api/worker/${workerId}`);

    if (res.ok) {
      const data = await res.json();
      setWorkerInfo(data);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (!workerId) return;

      setIsLoading(true);

      await getWorkerSchedule(workerId);
      await workerDetails(workerId);

      setIsLoading(false);
    };

    loadData();
  }, [workerId]);

  const filteredSchedule = workerSchedule.filter((info) => info.day === day);

  const handleOpenDialog = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setOpenDialog(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-gray-100">
      {isLoading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50 flex items-center justify-center">
          <div className="text-white text-sm tracking-widest animate-pulse">
            LOADING
          </div>
        </div>
      )}
      {openDialog && selectedSchedule && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-6">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 w-full max-w-md space-y-6">
            <h2 className="text-xl font-semibold tracking-tight">
              Schedule Detail
            </h2>

            <div className="space-y-2 text-gray-300 font-mono">
              <p>Day: {selectedSchedule.day}</p>
              <p>
                Time: {selectedSchedule.startTime} — {selectedSchedule.endTime}
              </p>
            </div>

            <button
              onClick={() => setOpenDialog(false)}
              className="w-full py-3 bg-white text-black text-xs uppercase tracking-widest rounded-xl hover:bg-gray-200 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="relative h-[40vh] w-full">
        {workerInfo?.profilePicture && (
          <img
            src={workerInfo.profilePicture}
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full px-6 sm:px-12 lg:px-24 pb-10">
          <h1 className="text-5xl sm:text-7xl font-semibold tracking-tighter">
            {workerInfo?.name}
          </h1>

          <div className="flex flex-wrap gap-6 mt-4 text-gray-400">
            <span>⭐ {workerInfo?.experience}</span>

            <span>📞 {workerInfo?.phoneNumber}</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-24 py-14 space-y-20">
        <div className="space-y-6">
          <p className="text-lg text-gray-500">
            Select weekday to view schedule
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
              "SATURDAY",
              "SUNDAY",
            ].map((d) => (
              <button
                key={d}
                onClick={() => setDay(d as DayOption)}
                className={`px-6 py-2 text-xs font-bold uppercase tracking-wider border rounded-full transition-all
                ${
                  day === d
                    ? "bg-white text-black border-white"
                    : "border-white/[0.1] text-gray-400 hover:bg-white/[0.03]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <section className="space-y-8 pb-20">
          <div className="flex justify-between items-center border-b border-white/[0.05] pb-4">
            <h2 className="text-xs uppercase tracking-[0.4em]">
              {day} Schedule
            </h2>

            <span className="text-[10px] font-mono text-gray-600">
              {filteredSchedule.length} entries
            </span>
          </div>

          {filteredSchedule.length === 0 ? (
            <p className="text-gray-600 text-lg">
              No schedule found for {day}.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05] border border-white/[0.05]">
              {filteredSchedule.map((info) => (
                <div
                  key={info.id}
                  className="bg-[#0A0A0A] p-6 hover:bg-white/[0.02] transition group"
                  onClick={() => handleOpenDialog(info)}
                >
                  <p className="text-lg text-gray-300 font-mono tracking-tight group-hover:text-white transition">
                    {info.startTime} — {info.endTime}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
