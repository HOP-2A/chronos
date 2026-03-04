"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const params = useParams();
  const workerId = params.workerId;
  
  const deleteWorker = async () => {
    const response = await fetch(`/api/worker/${workerId}`, {
      method: "DELETE",
    });
  };
  return <div className="bg-black">hi</div>;
};
export default Page;
