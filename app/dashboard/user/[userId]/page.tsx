"use client";
import React, { useEffect, useState } from "react";
import { LayoutDashboard, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  console.log(company.map((a) => a.id));

  const [isSidebarOpen, setSidebarOpen] = useState(true);

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
              CHRONOS
            </h1>
          )}
        </div>

        <nav className="flex flex-col gap-2">
          <div onClick={() => push(`/dashboard/user/${userId}`)}>
            <NavItem
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              active
            />
          </div>
          <div onClick={() => push(`/dashboard/user/${userId}/profile`)}>
            <NavItem icon={<User size={20} />} label="Profile" />
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <section className="p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Example Card */}
            {company.map((a, index) => (
              <div key={index}>
                <Card className="bg-gradient-to-br from-purple-950/20 to-black border-purple-900/30 h-70">
                  <CardContent className="text-white ">
                    {a.image ? (
                      <img
                        className="w-40 h-40 sm:h-48 object-cover object-center"
                        src={a.image}
                      />
                    ) : (
                      "no image"
                    )}
                    <div className="flex text-white justify-start">
                      <div className="ml-3 mt-2">{a?.name}</div>
                    </div>
                    <p className="text-white mt-4">Хаяг: {a?.location}</p>
                    <div>
                      Цагийн хуваарь:
                      <span className="text-xs font-mono text-purple-500 bg-purple-500/10 px-2 py-1 rounded">
                        WORKING HOURS GO HERE
                      </span>
                    </div>
                    <Button
                      className="w-full mt-2"
                      onClick={() => {
                        push(`/company/companyDetails/${a.id}`);
                      }}
                    >
                      Компани руу очих
                    </Button>
                  </CardContent>
                </Card>
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
