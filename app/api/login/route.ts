import { prisma } from '@/lib/admin/prisma';
import { comparePassword } from '@/lib/admin/auth';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await comparePassword(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  return NextResponse.json({ message: 'Login success', user });
}