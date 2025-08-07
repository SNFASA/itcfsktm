// app/api/auth/forgot.ts
import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';
import crypto from 'node:crypto';

export async function POST(req: Request) {
  const { email } = await req.json();

  const { data: user } = await supabase
    .from('user')
    .select('*')
    .eq('email', email)
    .single();

  if (!user) {
    return NextResponse.json({ error: 'Email not found' }, { status: 404 });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 3600_000).toISOString(); // 1 hour

  const { error: updateError } = await supabase
    .from('user')
    .update({ resetToken: token, resetTokenExp: expiry })
    .eq('email', email);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;
  console.log(`Reset URL: ${resetUrl}`);

  // TODO: Send email with resetUrl
  return NextResponse.json({ message: 'Reset email sent' });
}
