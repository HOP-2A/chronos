"use client";
import { CompanyType } from "@/app/dashboard/user/[userId]/page";
import { useEffect, useState } from "react";

export const Page = () => {
  const [company, setCompany] = useState<CompanyType[]>([]);

  const getWorkerCompany = async () => {
    const res = await fetch("/api/worker/getWorkersByCompanyId/${companyId}");
    const response = await res.json();
    setCompany(response);
  };
  useEffect(() => {
    getWorkerCompany();
  }, []);
  return (
    <div>
      <div></div>
    </div>
  );
};
