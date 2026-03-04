"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UserType } from "../page";

const Page = () => {
  const params = useParams();
  const userId = params.userId;
  const [user, setUser] = useState<UserType>();
  const [name, setName] = useState("");

  const getOneUser = async () => {
    const res = await fetch(`/api/user/${userId}`);
    const response = await res.json();
    setUser(response);
  };

  const editOneUser = async () => {
    await fetch(`/api/user/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({
        name,
      }),
    });
  };
  
  useEffect(() => {
    getOneUser();
  }, []);
  return <div></div>;
};
export default Page;
