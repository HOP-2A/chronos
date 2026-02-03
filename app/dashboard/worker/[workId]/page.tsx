"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export type UserType = {
  id: String;
  name: string;
  email: string;
  role: string;
  clerkId: string;
  companyId: string;
};

const Page = () => {
  const params = useParams();
  const workId = params.workId;
  const [getUser, setGetUser] = useState<UserType>();

  useEffect(() => {
    const userGet = async () => {
      const response = await fetch(`/api/worker/${workId}`);
      const res = await response.json();
      setGetUser(res);
    };
    userGet();
  }, []);
  return <div className="bg-black text-white">{getUser?.id}</div>;
};
export default Page;
