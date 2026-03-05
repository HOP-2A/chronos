"use client";
import React, { useEffect, useState } from "react";
import { LayoutDashboard, User, MapPin, Building } from "lucide-react";
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
  const { push } = useRouter();

  const [getUser, setGetUser] = useState<UserType[]>([]);
  const [company, setCompany] = useState<CompanyType[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

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

  return (
    <div className="flex h-screen bg-black text-zinc-300 font-sans">
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

      {/* MAIN */}

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* TOP HEADER */}

        <div className="w-full h-52 bg-gradient-to-b from-zinc-900 to-black border-b border-zinc-800 flex items-end">
          <div className="px-10 pb-8">
            <h2 className="text-2xl text-zinc-400 font-light">
              Explore{" "}
              <span className="text-purple-400 font-semibold">Companies</span>
            </h2>
          </div>
        </div>

        {/* CONTENT */}

        <section className="p-8 overflow-y-auto -mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {company.map((a, index) => (
              <Card
                key={index}
                className="bg-zinc-950 border-zinc-800 hover:border-purple-600 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20 group"
              >
                <CardContent className="p-0">
                  {/* IMAGE */}

                  <div className="h-48 overflow-hidden rounded-t-xl">
                    {a.image ? (
                      <img
                        src={a.image}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-500">
                        no image
                      </div>
                    )}
                  </div>

                  {/* INFO */}

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <Building className="w-4 h-4 text-purple-500" />
                      {a.name}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      {a.location}
                    </div>

                    <div className="text-sm text-zinc-400">
                      Цагийн хуваарь:
                      <span className="ml-2 text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                        WORKING HOURS GO HERE
                      </span>
                    </div>

                    <Button
                      className="w-full mt-2 bg-purple-600 hover:bg-purple-700"
                      onClick={() => push(`/company/companyDetails/${a.id}`)}
                    >
                      Компани руу очих
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* BOTTOM PLACEHOLDER */}

          <div className="mt-10 p-10 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center">
            <p className="text-zinc-500 italic">
              Content Area: Charts or data analytics will go here.
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
