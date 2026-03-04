"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const params = useParams();
  const workerId = params.workerId;
  const [deletedWorker, setDeletedWorker] = useState();
  const deleteWorker = async () => {
    const res = await fetch("",{
      method:"DELETE",
    });
    const response = await res.json();
    setDeletedWorker(response);
  };
  return <div className="bg-black">hi</div>;
};
export default Page;
