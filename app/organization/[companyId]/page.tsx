"use client";
import { useEffect, useState } from "react";

type WorkerType = {
  id: string;
  email: string;
  clerkId: string;
  name: string;
  phoneNumber: string;
  experience: string;
  feedback: string;
  companyId: string;
};
const Page = () => {
  const [worker, setWorker] = useState<WorkerType[]>([]);
  const [timeSchedule, setTimeSchedule] = useState();

  const workerGet = async () => {
    const response = await fetch("/api/worker");
    const res = await response.json();
    setWorker(res);
  };

  const timeScheduleGet = async () => {
    const response = await fetch("");
    const res = await response.json();
    setTimeSchedule(res);
  };

  useEffect(() => {
    workerGet();
    timeScheduleGet();
  }, []);
  return <div className="bg-black text-white">hello im the worker</div>;
};
export default Page;
