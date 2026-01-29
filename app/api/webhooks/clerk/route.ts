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
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;
  const user = evt.data as UserJSON;

  // schema-д nullable биш тул fallback өгнө
  const email =
    user.email_addresses?.[0]?.email_address ?? `${user.id}@placeholder.com`;

  const name =
    user.first_name || user.username || "Unnamed user";

  const role: Role =
    user.public_metadata?.isAdmin === true
      ? Role.SUPERADMIN
      : Role.USER;

  try {
    if (eventType === "user.created" || eventType === "user.updated") {
      await prisma.user.upsert({
        where: { clerkId: user.id },
        update: {
          email,
          name,
          role,
        },
        create: {
          clerkId: user.id,
          email,
          name,
          role,
        },
      });
    }

    if (eventType === "user.deleted") {
      await prisma.user.delete({
        where: { clerkId: user.id },
      });
    }

    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Webhook DB error:", err);
    return new Response("Server error", { status: 500 });
  }
}
