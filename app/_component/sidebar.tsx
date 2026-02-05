"use client";

import { useRouter, useParams } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const params = useParams();
  const userId = params.userId as string;

  return (
    <aside className="w-64 h-screen bg-zinc-900 text-white p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-purple-400 mb-8">User Panel</h2>

      <nav className="flex flex-col gap-3">
        <button
          onClick={() => router.push(`/dashboard/user/${userId}`)}
          className="px-4 py-2 rounded-lg text-left hover:bg-zinc-800 transition"
        >
          Dashboard
        </button>

        <button
          onClick={() => router.push(`/dashboard/user/${userId}/profile`)}
          className="px-4 py-2 rounded-lg text-left hover:bg-zinc-800 transition"
        >
          Profile
        </button>

        <button
          onClick={() => router.push(`/dashboard/user/${userId}/settings`)}
          className="px-4 py-2 rounded-lg text-left hover:bg-zinc-800 transition"
        >
          Settings
        </button>
      </nav>

      <div className="mt-auto text-sm text-zinc-400">© 2026</div>
    </aside>
  );
}
