"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

const Page = () => {
  const [users, setUsers] = useState([]);
  const clerkUser = useUser();
  const bringAllUsers = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();
    setUsers(data);
  };
  return <div>test</div>;
};
export default Page;
