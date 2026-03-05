"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, User, Loader2, Save } from "lucide-react";

const Page = () => {
  const params = useParams();
  const { push } = useRouter();
  const userId = params.userId;

  const [user, setUser] = useState<any>();
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
    <div className="flex min-h-screen bg-black text-zinc-300 font-sans">
      {/* SIDEBAR */}

      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-zinc-950 border-r border-zinc-800 transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <h1 className="text-xl font-bold text-purple-500 tracking-tight">
              CHRONOS
            </h1>
          )}
        </div>

        <nav className="flex flex-col gap-2 px-3">
          <div onClick={() => push(`/dashboard/user/${userId}`)}>
            <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
          </div>

          <div onClick={() => push(`/dashboard/user/${userId}/profile`)}>
            <NavItem icon={<User size={20} />} label="Profile" active />
          </div>
        </nav>
      </aside>

      {/* MAIN */}

      <main className="flex-1 flex flex-col">
        {/* HEADER */}

        <div className="w-full h-56 bg-gradient-to-b from-zinc-900 to-black border-b border-zinc-800 flex items-end">
          <div className="px-10 pb-8">
            <h2 className="text-2xl text-zinc-400 font-light">
              User{" "}
              <span className="text-purple-400 font-semibold">Profile</span>
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
          </div>
        ) : (
          <div className="p-10 -mt-12 animate-in fade-in duration-500">
            {/* PROFILE CARD */}

            <div className="max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl p-8 shadow-xl shadow-purple-900/10 backdrop-blur">
              {/* Avatar */}

              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                  {name?.[0]}
                </div>

                <div>
                  <p className="text-lg font-semibold text-white">{name}</p>
                  <p className="text-sm text-zinc-500">Chronos User</p>
                </div>
              </div>

              {/* FORM */}

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-white focus:border-purple-500 outline-none transition-all"
                  />
                </div>

                <button
                  onClick={editOneUser}
                  className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-medium transition-colors w-full"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
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
