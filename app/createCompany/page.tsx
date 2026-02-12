"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { TimePicker } from "../_component/TimePicker";

type CompanyInfo = {
  name: string;
  typeOfCompany: string;
  location: string;

  openTime: Date | null;
  closeTime: Date | null;

  workers: Array<{
    email: string;
    name: string;
    phoneNumber: string;
    experience: string[];
    feedback: string[];
  }>;
};

const BG_URL = "";

export default function Page() {
  const [info, setInfo] = useState<CompanyInfo>({
    name: "",
    typeOfCompany: "",
    location: "",
    openTime: null,
    closeTime: null,
    workers: [
      { email: "", name: "", phoneNumber: "", experience: [], feedback: [] },
    ],

    timeSchedules: [{ day: "", openTime: [], Time: [] }],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (name === "feedback") {
      setInfo({ ...info, feedback: value });
    }
    if (name === "openTime") {
      setInfo({ ...info, openTime: value });
    }
    if (name === "closeTime") {
      setInfo({ ...info, closeTime: value });
    }
  };
  const createCompany = async () => {
    const res = await fetch("api/company", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(info),
    });
  };
  return (
    <div className="relative min-h-screen text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${BG_URL}')` }}
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative mx-auto flex min-h-screen max-w-4xl items-center justify-center p-6">
        <Card className="w-full max-w-xl border-white/10 bg-black/50 backdrop-blur-xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl text-white">
              Create a company
            </CardTitle>
            <CardDescription className="text-white/70">
              Basic company details + business hours.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <div className="text-sm text-white/80">Company name</div>
                <Input
                  name="companyName"
                  value={info.name}
                  onChange={handleInputValue}
                  placeholder="e.g. paradox barbers"
                  className="border-white/10 bg-white/5 text-white placeholder:text-white/35"
                />
              </div>

              <div className="space-y-2">
                <div className="text-sm text-white/80">Type of company</div>
                <Input
                  name="companyType"
                  value={info.typeOfCompany}
                  onChange={handleInputValue}
                  placeholder="e.g. barbershop, repair shop"
                  className="border-white/10 bg-white/5 text-white placeholder:text-white/35"
                />
              </div>

        <label className="flex flex-col">
          close time
          <Input
            name="closeTime"
            onChange={handleInputValue}
            className="h-[40px] w-[100px]"
          ></Input>
        </label>
        <label className="flex flex-col">
          feedback
          <Input
            name="feedback"
            onChange={handleInputValue}
            placeholder="City or address"
            className="mt-1  text-white"
          />
        </label>

            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white/90">
                  Business hours
                </p>
                <span className="text-xs text-white/50">Mon–Fri</span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TimePicker
                  label="Open time"
                  value={info.openTime}
                  onChange={(d) => setInfo((p) => ({ ...p, openTime: d }))}
                  stepMinutes={15}
                  baseDate={baseDate}
                  use12h={false}
                />

                <TimePicker
                  label="Close time"
                  value={info.closeTime}
                  onChange={(d) => setInfo((p) => ({ ...p, closeTime: d }))}
                  stepMinutes={15}
                  baseDate={baseDate}
                  use12h={false}
                />
              </div>

              {timesInvalid && (
                <p className="text-xs text-red-400">
                  close time must be after open time
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button
                className="bg-white text-black hover:bg-white/90 disabled:opacity-50"
                onClick={createCompany}
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create company"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
