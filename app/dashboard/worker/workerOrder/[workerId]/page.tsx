"use client";

import { useUser } from "@clerk/nextjs";
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
  slotInterval: number;
};

type Appointment = {
  startAt: string;
  endAt: string;
  status: "BOOKED" | "AVAILABLE";
};

export default function Page() {
  const params = useParams();
  const workerId = String(params.workerId ?? "");

  const { user } = useUser();

  const [userId, setUserId] = useState("");
  const [workerSchedule, setWorkerSchedule] = useState<Schedule[]>([]);
  const [workerInfo, setWorkerInfo] = useState<any>(null);
  const [day, setDay] = useState<DayOption>("MONDAY");
  const [isLoading, setIsLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState<string | null>(
    null,
  );
  const [selectedEndTime, setSelectedEndTime] = useState<string | null>(null);

  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const convertTimeToISO = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(h, m, 0, 0);
    return date.toISOString();
  };

  const addMinutesToTime = (time: string, minutes: number) => {
    const [h, m] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(h, m, 0, 0);
    date.setMinutes(date.getMinutes() + minutes);
    return date.toTimeString().slice(0, 5);
  };

  const getWorkerSchedule = async (workerId: string) => {
    const res = await fetch("/api/worker/getWorkerSchedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workerId }),
    });

    if (!res.ok) return;

    const data = await res.json();
    setWorkerSchedule(Array.isArray(data) ? data : data?.schedule || []);
  };
  const getAppointments = async () => {
    const res = await fetch(`/api/appointment/timeSchedule/${workerId}`);

    if (!res.ok) return;

    const data = await res.json();

    const booked: string[] = [];

    if (Array.isArray(data)) {
      data.forEach((appt) => {
        if (appt.status === "BOOKED") {
          const start = new Date(appt.startAt);
          const h = String(start.getHours()).padStart(2, "0");
          const m = String(start.getMinutes()).padStart(2, "0");
          booked.push(`${h}:${m}`);
        }
      });
    } else if (Array.isArray(data?.appointments)) {
      data.appointments.forEach((appt: any) => {
        if (appt.status === "BOOKED") {
          const start = new Date(appt.startAt);
          const h = String(start.getHours()).padStart(2, "0");
          const m = String(start.getMinutes()).padStart(2, "0");
          booked.push(`${h}:${m}`);
        }
      });
    }

    setBookedSlots(booked);
  };

  const getUser = async () => {
    if (!user?.id) return;

    const res = await fetch(`/api/user/${user.id}`);
    if (!res.ok) return;
    const data = await res.json();
    setUserId(data?.id ?? "");
  };

  const workerDetails = async (workerId: string) => {
    const res = await fetch(`/api/worker/${workerId}`);
    if (!res.ok) return;
    setWorkerInfo(await res.json());
  };

  useEffect(() => {
    if (!workerId) return;
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        getWorkerSchedule(workerId),
        workerDetails(workerId),
        getUser(),
        getAppointments(),
      ]);
      setIsLoading(false);
    };
    loadData();
  }, [workerId, user?.id]);

  const generateSlots = (
    startTime: string,
    endTime: string,
    interval: number,
  ) => {
    const slots: string[] = [];
    if (!startTime || !endTime || interval <= 0) return slots;

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

  const isSlotBooked = (time: string) => bookedSlots.includes(time);

  const sendOrder = async () => {
    if (!selectedStartTime || !selectedEndTime || !workerInfo || !user?.id)
      return;

    const res = await fetch("/api/appointment/timeSchedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyId: workerInfo.companyId,
        workerId,
        userId,
        startAt: convertTimeToISO(selectedStartTime),
        endAt: convertTimeToISO(selectedEndTime),
      }),
    });

    if (res.ok) {
      alert("Booked successfully!");
      setOpenDialog(false);
      getWorkerSchedule(workerId);
      getAppointments();
    }
  };

  const filteredSchedule = Array.isArray(workerSchedule)
    ? workerSchedule.filter((info) => info.day === day)
    : [];

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-gray-100">
      {isLoading && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center">
          <div className="text-white tracking-widest animate-pulse">
            Ачааллаж байна...
          </div>
        </div>
      )}

      <div className="relative h-[40vh] w-full">
        {workerInfo?.profilePicture && (
          <img
            src={workerInfo.profilePicture}
            alt="profile"
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
          <p className="text-lg text-gray-500">Ажлын өдрийг сонгоно уу</p>
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
                className={`px-6 py-2 text-xs font-bold uppercase tracking-wider border rounded-full transition-all cursor-pointer
                ${
                  day === d
                    ? "bg-purple-500 text-black border-purple-600"
                    : "border-white/[0.1] text-gray-400 hover:bg-white/[0.03]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <section className="space-y-8 pb-20">
          <div className="border-b border-white/[0.05] pb-4">
            <h2 className="text-xs uppercase tracking-[0.4em] text-purple-500">
              {day} Хуваарь
            </h2>
          </div>

          {filteredSchedule.length === 0 ? (
            <p className="text-gray-600 text-lg">
              {day} өдөрт хуваарь олдсонгүй.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05] border border-white/[0.05]">
              {filteredSchedule.flatMap((info) =>
                generateSlots(
                  info.startTime,
                  info.endTime,
                  info.slotInterval ?? 60,
                ).map((slot, index) => {
                  const endTime = addMinutesToTime(
                    slot,
                    info.slotInterval ?? 60,
                  );

                  return (
                    <div
                      key={`${info.id}-${slot}-${index}`}
                      onClick={() => {
                        if (isSlotBooked(slot)) return;
                        setSelectedStartTime(slot);
                        setSelectedEndTime(endTime);
                        setOpenDialog(true);
                      }}
                      className={`bg-[#0A0A0A] p-8 flex flex-col items-center justify-center hover:bg-white/[0.02] cursor-pointer ${
                        isSlotBooked(slot)
                          ? "opacity-30 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <span className="text-3xl font-light font-mono">
                        {slot}
                      </span>
                    </div>
                  );
                }),
              )}
            </div>
          )}
        </section>
      </div>

      {openDialog && selectedStartTime && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0A0A0A] border border-white/[0.1] p-8 rounded-xl min-w-[320px]">
            <h3 className="text-xl mb-4">Selected Time</h3>
            <p className="text-purple-400 text-3xl font-mono mb-2">
              {selectedStartTime} → {selectedEndTime}
            </p>
            <button
              onClick={sendOrder}
              disabled={isSlotBooked(selectedStartTime)}
              className="mt-6 px-4 py-2 bg-purple-500 text-black rounded-lg w-full hover:bg-purple-400 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Book Time
            </button>
            <button
              onClick={() => setOpenDialog(false)}
              className="mt-3 px-4 py-2 border border-white/20 rounded-lg w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
