"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { WorkerType } from "../page";

const Page = () => {
  const params = useParams();
  const workerId = params.workerId;
  const [worker, setWorker] = useState<WorkerType>();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [experience, setExperience] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const getOneWorker = async () => {
    const res = await fetch(`/api/worker/${workerId}`);
    const response = await res.json();
    setWorker(response);
  };

  const editOneWorker = async () => {
    await fetch(`/api/worker/${workerId}`, {
      method: "PATCH",
      body: JSON.stringify({
        name,
        phoneNumber,
        experience,
        profilePicture,
      }),
    });
  };

  console.log(worker);

  useEffect(() => {
    getOneWorker();
  }, []);
  return <div></div>;
};
export default Page;
