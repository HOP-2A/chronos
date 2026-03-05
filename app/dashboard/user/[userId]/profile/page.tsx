"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, User, Loader2 } from "lucide-react";
import { UserType } from "../page";

const Page = () => {
  const params = useParams();
  const { push } = useRouter();
  const userId = params.userId;

  const [user, setUser] = useState<UserType>();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const getOneUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/${userId}`);
      const response = await res.json();
      setUser(response);
      setName(response.name || "");
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(user);
  const deleteUser = async () => {
    await fetch(`/api/user/${userId}`, {
      method: "DELETE",
    });
  };

  const editOneUser = async () => {
    await fetch(`/api/user/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ name }),
    });
  };

  useEffect(() => {
    if (userId) getOneUser();
  }, [userId]);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-zinc-900 border-r border-zinc-800 transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <h1 className="text-xl font-bold text-purple-500 tracking-tight">
              CHRONOS
            </h1>
          )}
        </div>

        <nav className="flex flex-col gap-2">
          <div onClick={() => push(`/dashboard/user/${userId}`)}>
            <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
          </div>
          <div onClick={() => push(`/dashboard/user/${userId}/profile`)}>
            <NavItem icon={<User size={20} />} label="Profile" active />
          </div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
          </div>
        ) : (
          <div className="p-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold mb-6">User Profile</h2>
            <div className="max-w-md space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 focus:ring-1 focus:ring-purple-500 outline-none"
                />
              </div>
              <button
                onClick={editOneUser}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`
      flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200
      ${
        active
          ? "bg-purple-600/20 text-purple-400 border border-purple-500/30 shadow-[inset_0_0_10px_rgba(168,85,247,0.1)]"
          : "text-slate-500 hover:text-purple-300 hover:bg-purple-900/10"
      }
    `}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}

export default Page;
