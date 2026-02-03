"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
const Page = () => {
  const [company, setCompany] = useState([]);
  const getCompanies = async () => {
    const res = await fetch(`/api/company`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch companies");
    }
    const data = await res.json();
    setCompany(data);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCompanies();
  }, []);
  console.log(company);
  return (
    <div className="min-h-screen flex flex-col bg-[#000000]">
      <div className="flex justify-center pt-6">
        <p className="text-3xl text-white font-semibold">Company</p>
      </div>
      <div className="flex justify-center mt-10 gap-4">
        <Button>Restaurant</Button>
        <Button>Service</Button>
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {company.map((c) => (
          <Card
            key={c.id}
            className="relative w-full max-w-sm pt-0 rounded-md overflow-hidden "
          >
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <div>
              <img
                src="https://avatar.vercel.sh/shadcn1"
                alt="Event cover"
                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
              />
            </div>
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">
                  {" "}
                  <div className="flex justify-center">
                    <div key={c.id}>
                      <div>{c.typeOfCompany}</div>
                    </div>
                  </div>
                </Badge>
              </CardAction>
              <CardTitle>
                <div className="flex justify-start px-4">
                  <div key={c.id} className="w-full">
                    <div className="flex items-center gap-2 text-5xl">
                      <span className="text-2xl">{c.name}</span>
                    </div>
                  </div>
                </div>
              </CardTitle>

              <div className="px-4">
                <div key={c.id} className="w-full flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xl font-semibold text-foreground">
                      {c.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase text-muted-foreground ">
                      Feedback:
                    </span>
                    <p className="text-sm leading-relaxed text-foreground text-sm text-foreground/80">
                      {c.feedback}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <hr></hr>
            <CardFooter>
              <Button className="w-full">View</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};;

export default Page;
