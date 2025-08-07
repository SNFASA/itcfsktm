import { prisma } from '@/lib/admin/prisma';
import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
export async function POST(req: Request) {
  const { email } = await req.json();
  const token = randomUUID();
  const exp = new Date(Date.now() + 3600_000); // 1 hour
  await prisma.user.update({
    where: { email },
    data: { resetToken: token, resetTokenExp: exp },
  });
  console.log(`Reset link: http://localhost:3000/reset-password/${token}`);
  return NextResponse.json({ message: 'Check your email for reset link' });
}