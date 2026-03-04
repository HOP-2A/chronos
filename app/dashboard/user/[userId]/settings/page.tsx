"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const params = useParams();
  const userId = params.userId;

  const deleteUser = async () => {
    await fetch(`/api/user/${userId}`, {
      method: "DELETE",
    });
  };
  return <div className="bg-black">hi</div>;
};
export default Page;
