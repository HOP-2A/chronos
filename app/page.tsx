"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [users, setUsers] = useState([]);
  const clerkUser = useUser();
  const { push } = useRouter();
  const bringAllUsers = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();
    setUsers(data);
  };
  return (
    <div className="bg-black">
      <div
        className="flex justify-center text-center"
        style={{
          fontSize: "120px",
          fontWeight: "800",
          letterSpacing: "0.05em",
          fontFamily: "Playfair Display, serif",
          background:
            "linear-gradient(90deg, #ff4fd8, #f2b6d9, #9b6bff, #5b2dff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Chronos
      </div>
      <div
        className="flex justify-center"
        onClick={() => {
          push("/company");
        }}
      >
        <Button
          variant="ghost"
          className="bg-pink-400 text-white hover:bg-purple-300 hover:text-white cursor-pointer"
        >
          Get started
        </Button>
      </div>

      <div className="realtive w-full h-full">
        <div className="absolute pt-10">
          <img src="cuties.png" />
        </div>
        <img src="bg.png" />
      </div>
    </div>
  );
};
export default Page;
