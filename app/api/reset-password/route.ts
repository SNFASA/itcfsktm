import { prisma } from '@/lib/admin/prisma';
import { hashPassword } from '@/lib/admin/auth';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  const { token, newPassword } = await req.json();
  const user = await prisma.user.findFirst({ where: {
    resetToken: token,
    resetTokenExp: { gt: new Date() },
  }});
  if (!user) return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  const hashed = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashed, resetToken: null, resetTokenExp: null },
  });
  return NextResponse.json({ message: 'Password reset successful' });
}