"use client";
import React, { useEffect, useState } from "react";
import { LayoutDashboard, User, Settings, LogOut, Menu, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
export type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  clerkId: string;
  companyId: string;
};
export type CompanyType = {
  closeTime: Date;
  createdAt: Date;
  feedback: string;
  id: string;
  location: string;
  name: string;
  openTime: Date;
  typeOfCompany: string;
  image: string;
};

const UserPanel = () => {
  const params = useParams();
  const userId = params.userId;
  const [getUser, setGetUser] = useState<UserType[]>([]);
  const [company, setCompany] = useState<CompanyType[]>([]);
  const { push } = useRouter();

  const companyGet = async () => {
    const response = await fetch("/api/company");
    const res = await response.json();
    setCompany(res);
  };

  useEffect(() => {
    const userGet = async () => {
      const response = await fetch(`/api/user/${userId}`);
      const res = await response.json();
      setGetUser(res);
    };
    userGet();
    companyGet();
  }, []);

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Profile", icon: <User size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-zinc-900 border-r border-zinc-800 transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <h1 className="text-xl font-bold text-purple-500 tracking-tight">
              CORE
            </h1>
          )}
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-zinc-800 rounded-lg text-purple-400"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center p-3 rounded-xl cursor-pointer transition-colors hover:bg-purple-600/10 hover:text-purple-400 group"
            >
              <span className="group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              {isSidebarOpen && (
                <span className="ml-4 font-medium">{item.name}</span>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button className="flex items-center w-full p-3 text-zinc-400 hover:text-red-400 transition-colors">
            <LogOut size={20} />
            {isSidebarOpen && <span className="ml-4 font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-zinc-950/50 backdrop-blur-md">
          <h2 className="text-lg font-semibold">User Overview</h2>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-purple-600 shadow-[0_0_15px_rgba(147,51,234,0.4)]" />
          </div>
        </header>

        <section className="p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Example Card */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 transition-colors group"
              >
                <p className="text-zinc-400 text-sm mb-1">Active Projects</p>
                <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">
                  12
                </h3>
              </div>
            ))}
          </div>

          <div className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 h-64 flex items-center justify-center">
            <p className="text-zinc-500 italic">
              Content Area: Your charts or data tables go here.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserPanel;
