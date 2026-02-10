"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Page = () => {
  const [info, setInfo] = useState({
    name: "",
    typeOfCompany: "",
    location: "",
    workers: [],
    timeSchedules: [
      {
        day: "Monday",
        startTime: "",
        endTime: "",
      },
    ],
  });

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "companyName") {
      setInfo((prev) => ({ ...prev, name: value }));
    }

    if (name === "companyType") {
      setInfo((prev) => ({ ...prev, typeOfCompany: value }));
    }

    if (name === "location") {
      setInfo((prev) => ({ ...prev, location: value }));
    }

    if (name === "openTime") {
      setInfo((prev) => ({
        ...prev,
        timeSchedules: [
          {
            ...prev.timeSchedules[0],
            startTime: value,
          },
        ],
      }));
    }

    if (name === "closeTime") {
      setInfo((prev) => ({
        ...prev,
        timeSchedules: [
          {
            ...prev.timeSchedules[0],
            endTime: value,
          },
        ],
      }));
    }
  };

  const createCompany = async () => {
    const res = await fetch("api/company", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    });

    const data = await res.json();
    console.log("Created company:", data);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">Create a Company</h1>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <label className="flex flex-col">
          Company Name
          <Input
            name="companyName"
            onChange={handleInputValue}
            placeholder="Enter company name"
            className="mt-1 text-white"
          />
        </label>

        <label className="flex flex-col">
          Type of Company
          <Input
            name="companyType"
            onChange={handleInputValue}
            placeholder="Service type"
            className="mt-1 text-white"
          />
        </label>

        <label className="flex flex-col">
          Location
          <Input
            name="location"
            onChange={handleInputValue}
            placeholder="City or address"
            className="mt-1 text-white"
          />
        </label>

        <div className="flex gap-4">
          <label className="flex flex-col">
            Open time
            <Input
              name="openTime"
              onChange={handleInputValue}
              placeholder="09:00"
              className="h-[40px] w-[120px]"
            />
          </label>

          <label className="flex flex-col">
            Close time
            <Input
              name="closeTime"
              onChange={handleInputValue}
              placeholder="18:00"
              className="h-[40px] w-[120px]"
            />
          </label>
        </div>

        <Button
          className="mt-6 bg-white text-black hover:bg-gray-200"
          onClick={createCompany}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Page;
