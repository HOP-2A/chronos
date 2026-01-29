export const runtime = "nodejs";

import { Webhook } from "svix";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { UserJSON, UserWebhookEvent } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  const WH_SECRET = process.env.WH_SECRET;
  if (!WH_SECRET) throw new Error("Missing CLERK_WEBHOOK_SECRET");

  const payload = await req.text();
  const headerList = await headers();

  const svixHeaders = {
    "svix-id": headerList.get("svix-id")!,
    "svix-timestamp": headerList.get("svix-timestamp")!,
    "svix-signature": headerList.get("svix-signature")!,
  };

  const wh = new Webhook(WH_SECRET);
  let evt: UserWebhookEvent;

  try {
    evt = wh.verify(payload, svixHeaders) as UserWebhookEvent;
  } catch (err) {
    console.error("Webhook verify failed", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const user = evt.data as UserJSON;

  const email =
    user.email_addresses?.[0]?.email_address ?? `user_${user.id}@clerk.local`;

  const name = user.first_name || user.username || "Unnamed user";

  const role =
    user.public_metadata?.isAdmin === true ? Role.SUPERADMIN : Role.USER;

  try {
    if (evt.type === "user.created" || evt.type === "user.updated") {
      await prisma.user.upsert({
        where: { clerkId: user.id },
        update: { email, name, role },
        create: { clerkId: user.id, email, name, role },
      });
    }

    if (evt.type === "user.deleted") {
      await prisma.user.deleteMany({
        where: { clerkId: user.id },
      });
    }

    return Response.json({ received: true });
  } catch (err) {
    console.error("Prisma error:", err);
    return new Response("DB error", { status: 500 });
  }
}
