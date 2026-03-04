"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { WorkerType } from "../page";
import Sidebar from "@/app/_component/sidebar";

const Page = () => {
  const params = useParams();
  const workerId = params.workerId;
  const [worker, setWorker] = useState<WorkerType>();
  const getOneWorker = async () => {
    const res = await fetch(`/api/worker/${workerId}`);
    const response = await res.json();
    setWorker(response);
  };
  console.log(worker);
  useEffect(() => {
    getOneWorker();
  }, []);
  return (
    <div>

    </div>
  );
};
export default Page;
