"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";

export default function CreateWorkerPage() {
  const { user } = useUser();
  const { push } = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [experience, setExperience] = useState<string[]>([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    if (!user?.id) return;

    const res = await fetch(`/api/user/${user.id}`);

    if (!res.ok) {
      toast.error("Failed to fetch user");
      setLoading(false);
      return;
    }
    const data = await res.json();

    if (data.error) {
      toast.error("fetch failed", data.error);
      setLoading(false);
    } else {
      setUserId(data.id);
      setName(data.name);
      setEmail(data.email);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, [user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User avjiin");
      return;
    }

    const res = await fetch("/api/worker/workerCreate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name,
        phoneNumber,
        experience,
        userId,
      }),
    });

    if (!res.ok) {
      toast.success("Worker created successfully!");
      setEmail("");
      setName("");
      setPhoneNumber("");
      setExperience([]);
    } else {
      toast.error("Failed to create worker");
      return;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-400 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center   p-6 bg-black">
      <Toaster />
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <header className="mb-8">
          <h1 className="text-xl font-medium text-gray-900">New Worker</h1>
          <p className="text-sm text-gray-500">
            Enter the details to register a new profile.
          </p>
        </header>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your gmail"
              className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-black transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Your Name (can be a nickname)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-black transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-black transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Experience
            </label>
            <input
              type="text"
              value={experience.join(",")}
              onChange={(e) => setExperience(e.target.value.split(","))}
              placeholder="your work experience"
              className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-black transition"
            />
          </div>

          <div
            onClick={() => {
              push(`/dashboard/worker/${user?.id}`);
            }}
          >
            <button
              onClick={handleSubmit}
              className="w-full mt-4 py-3 px-4 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
            >
              Create Worker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
