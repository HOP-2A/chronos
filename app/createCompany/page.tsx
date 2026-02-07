/* eslint-disable react/jsx-no-undef */
"use client";

import { useState, useEffect } from "react";

import * as React from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

const Page = () => {
  const [info, setInfo] = useState({
    name: "",
    typeOfCompany: "",
    location: "",

    workers: [
      {
        email: "",
        name: "",
        phoneNumber: "",
        experience: [],
        feedback: [],
      },
    ],

    timeSchedules: [{ day: "", startTime: [], endTime: [] }],
  });
  const handleInputValue = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    if (name === "companyName") {
      setInfo({ ...info, name: value });
    }
    if (name === "companyType") {
      setInfo({ ...info, typeOfCompany: value });
    }
    if (name === "location") {
      setInfo({ ...info, location: value });
    }
    if (name === "openTime") {
      setInfo({ ...info, startTime: value });
    }
    if (name === "closeTime") {
      setInfo({ ...info, endTime: value });
    }
  };
  const createCompany = async () => {
    const res = await fetch("api/company", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(info),
    });
    const data = await res.json();
    setInfo(data);
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
            placeholder="service type"
            className="mt-1  text-white"
          />
        </label>

        <label className="flex flex-col">
          Location
          <Input
            name="location"
            onChange={handleInputValue}
            placeholder="City or address"
            className="mt-1  text-white"
          />
        </label>

        <label className="flex flex-col">
          open time{" "}
          <Input
            name="openTime"
            onChange={handleInputValue}
            className="h-[40px] w-[100px]"
          ></Input>
        </label>

        <label className="flex flex-col">
          close time
          <Input
            name="closeTime"
            onChange={handleInputValue}
            className="h-[40px] w-[100px]"
          ></Input>
        </label>

        <Button
          className="mt-4 bg-white text-black hover:bg-gray-200"
          onClick={createCompany}
        >
          send
        </Button>
      </div>
    </div>
  );
};

export default Page;
