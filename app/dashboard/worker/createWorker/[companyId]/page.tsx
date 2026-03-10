"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function CreateWorkerPage() {
  const params = useParams();
  const companyId = String(params.companyId);
  const { push } = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [experience, setExperience] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/worker/createWorker/${companyId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name,
        phoneNumber,
        experience,
        password,
      }),
    });

    if (res.ok) {
      toast.success("Worker created successfully!");
      setEmail("");
      setName("");
      setPhoneNumber("");
      setExperience("");
      setPassword("");
      const worker = await res.json();
      push(`/dashboard/worker/${worker.worker.id}`);
    } else {
      toast.error("Failed to create worker write strong password");
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] p-4 sm:p-6 text-gray-100">
      <Toaster />

      <div className="w-full max-w-md bg-[#111111] p-6 sm:p-8 rounded-xl border border-white/[0.05] shadow-2xl">
        <header className="mb-8 border-b border-white/[0.05] pb-6">
          <h1 className="text-xl font-medium tracking-tight text-white">
            New Worker
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Register a new profile in the system.
          </p>
        </header>

        <div className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@gmail.com"
              className="w-full p-3 rounded-lg border border-white/[0.05] bg-white/[0.02] text-gray-200 placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name or nickname"
              className="w-full p-3 rounded-lg border border-white/[0.05] bg-white/[0.02] text-gray-200 placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
              Phone Number
            </label>
            <input
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full p-3 rounded-lg border border-white/[0.05] bg-white/[0.02] text-gray-200 placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
              Experience
            </label>
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="React, Design, Management"
              className="w-full p-3 rounded-lg border border-white/[0.05] bg-white/[0.02] text-gray-200 placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
              Password
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="React, Design, Management"
              className="w-full p-3 rounded-lg border border-white/[0.05] bg-white/[0.02] text-gray-200 placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm"
            />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ">
              write strong password
            </span>
          </div>

          <div>
            <button
              onClick={handleSubmit}
              className="w-full mt-4 py-3 px-4 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-all active:scale-[0.98] shadow-lg shadow-white/5"
            >
              Send Request Succesfully
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
