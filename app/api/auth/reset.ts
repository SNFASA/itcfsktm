// /app/api/auth/reset.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/admin/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExp: { gte: new Date() },
    },
  });

  if (!user) return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExp: null,
    },
  });

  return NextResponse.json({ message: "Password updated successfully" });
}
