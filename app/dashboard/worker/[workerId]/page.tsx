"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  MessageSquare,
  User,
  Settings,
  LogOut,
} from "lucide-react";

// Assuming types for the complex nested objects
type Day = string | Date;
type DayOption = string;

export type WorkerType = {
  id: string;
  name: string;
  email: string;
  experience: string;
  clerkId: string;
  companyId: string;
  feedback: string[];
  phoneNumber: number;
  profilePicture: string;
  applications: [
    {
      companyId: string;
      createdAt: Day;
      decidedAt: string;
      decidedById: string;
      id: string;
      reason: string;
      workerId: string;
    },
  ];
  timeSchedule: {
    id: string;
    companyId: string;
    workerId: string;
    day: DayOption;
    startTime: string;
    endTime: string;
  };
};

const Page = () => {
  const params = useParams();
  const workerId = params.workerId;
  const [worker, setWorker] = useState<WorkerType>();

  const getOneWorker = async () => {
    const res = await fetch(`/api/worker/${workerId}`);
    const response = await res.json();
    setWorker(response);
  };

  useEffect(() => {
    getOneWorker();
  }, []);

  if (!worker) return <div className="min-h-screen bg-black" />;

  return (
    <div className="w-full min-h-screen bg-black text-zinc-300 font-sans pb-12">
      {/* Top Banner Area - Matches the screenshot's dark header */}
      <div className="w-full h-64 bg-gradient-to-b from-zinc-900 to-black relative border-b border-zinc-800">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="max-w-7xl mx-auto h-full flex items-end pb-12 px-8">
          <h2 className="text-2xl font-light text-zinc-400">
            Welcome back,{" "}
            <span className="text-purple-400 font-semibold">{worker.name}</span>
          </h2>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16">
        {/* Profile Floating Bar */}
        <Card className="bg-zinc-950/80 border-zinc-800 backdrop-blur-xl mb-8 shadow-2xl">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-black shadow-lg shadow-purple-900/20">
                <AvatarImage src={worker.profilePicture} />
                <AvatarFallback className="bg-purple-900 text-white text-3xl">
                  {worker.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-1 right-1 bg-purple-600 p-2 rounded-full border-2 border-black">
                <Settings className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Quick Stats Grid - Matching the boxes in your image */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {[
                {
                  label: "Applications",
                  val: worker.applications.length,
                  icon: Briefcase,
                },
                {
                  label: "Feedbacks",
                  val: worker.feedback.length,
                  icon: MessageSquare,
                },
                { label: "Exp. Level", val: "Senior", icon: StarIcon },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 flex items-center gap-4"
                >
                  <div className="p-3 bg-purple-900/20 rounded-lg">
                    <item.icon className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase font-bold">
                      {item.label}
                    </p>
                    <p className="text-xl font-bold text-white">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-2 text-zinc-500 hover:text-red-400 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </CardContent>
        </Card>

        {/* Layout Grid: Profile Info & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Information Form Section (Left & Middle) */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4 border-b border-purple-900/30 pb-2">
                <h3 className="text-xl font-semibold text-white">
                  Personal Information
                </h3>
                <div className="h-1 w-16 bg-purple-600 rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoBox
                  label="Full Name"
                  value={worker.name}
                  icon={<User className="w-4 h-4" />}
                />
                <InfoBox
                  label="Email Address"
                  value={worker.email}
                  icon={<Mail className="w-4 h-4" />}
                />
                <InfoBox
                  label="Phone Number"
                  value={worker.phoneNumber.toString()}
                  icon={<Phone className="w-4 h-4" />}
                />
                <InfoBox
                  label="Company ID"
                  value={worker.companyId}
                  icon={<Briefcase className="w-4 h-4" />}
                />
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4 border-b border-purple-900/30 pb-2">
                <h3 className="text-xl font-semibold text-white">
                  Experience & Bio
                </h3>
                <div className="h-1 w-16 bg-purple-600 rounded-full" />
              </div>
              <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
                <p className="text-zinc-400 leading-relaxed italic">
                  "{worker.experience}"
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar Section (Right) */}
          <div className="space-y-6">
            <Card className="bg-zinc-950 border-zinc-800 overflow-hidden">
              <div className="bg-purple-900/20 p-4 border-b border-zinc-800">
                <h4 className="text-white font-bold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  Work Schedule
                </h4>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Day</span>
                    <Badge
                      variant="secondary"
                      className="bg-zinc-800 text-purple-400"
                    >
                      {worker.timeSchedule.day}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Hours</span>
                    <span className="text-white font-mono">
                      {worker.timeSchedule.startTime} -{" "}
                      {worker.timeSchedule.endTime}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-950 border-zinc-800">
              <CardContent className="p-6">
                <h4 className="text-white font-bold mb-4">Latest Feedback</h4>
                <div className="space-y-4">
                  {worker.feedback.slice(0, 2).map((text, i) => (
                    <div
                      key={i}
                      className="text-sm text-zinc-500 border-l-2 border-purple-600 pl-4 py-1"
                    >
                      {text}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Sub-component for the info boxes
const InfoBox = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
      {label}
    </label>
    <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 p-4 rounded-xl focus-within:border-purple-500 transition-all">
      <span className="text-purple-500">{icon}</span>
      <span className="text-zinc-200">{value}</span>
    </div>
  </div>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default Page;
