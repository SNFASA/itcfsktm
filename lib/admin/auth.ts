import bcrypt from 'bcryptjs';
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}
export async function comparePassword(raw: string, hash: string) {
  return bcrypt.compare(raw, hash);
}

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.password !== password) {
    return { success: false, message: "Invalid credentials" };
  }
  return { success: true };
}

export async function requestResetPassword(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { success: false, message: "Email not found" };
  }
  // Generate token and send email here (mocked)
  return { success: true, message: "Reset link sent to your email." };
}