"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { log } from "console";
import { ChangeEvent, useState } from "react";
type AdminType = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  companyId: string;
};
const Page = () => {
  const [admin, setAdmin] = useState<AdminType>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleInput2 = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleInput3 = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };
  const adminPost = async () => {
    fetch("/api/admin", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        phoneNumber,
      }),
    });
  };

  return (
    <div className="bg-black text-white flex justify-center">
      <div>Hello</div>
      <div>
        <Input
          placeholder="name"
          onChange={(e) => {
            handleInput(e);
          }}
        />
        <Input
          placeholder="email"
          onChange={(e) => {
            handleInput2(e);
          }}
        />
        <Input
          placeholder="phoneNumber"
          onChange={(e) => {
            handleInput3(e);
          }}
        />
        <Button
          onClick={() => {
            adminPost();
          }}
        >
          enter
        </Button>
      </div>
    </div>
  );
};

export default Page;
