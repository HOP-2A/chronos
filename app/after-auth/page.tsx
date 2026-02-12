"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AfterAuth() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !user) return;

    router.replace(`/dashboard/user/${user.id}`);
  }, [isLoaded, user, router]);

  return null;
}
