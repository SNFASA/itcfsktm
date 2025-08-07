// /app/api/auth/forgot.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/admin/prisma";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return NextResponse.json({ error: "Email not found" }, { status: 404 });

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.user.update({
    where: { email },
    data: {
      resetToken: token,
      resetTokenExp: expiry,
    },
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;
  console.log(`Reset URL: ${resetUrl}`); // ganti dengan actual email sending logic

  return NextResponse.json({ message: "Reset email sent" });
}
