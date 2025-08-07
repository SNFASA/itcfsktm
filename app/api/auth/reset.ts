// app/api/auth/reset.ts
import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { token, newPassword } = await req.json();

  const { data: user } = await supabase
    .from('user')
    .select('*')
    .eq('resetToken', token)
    .gte('resetTokenExp', new Date().toISOString())
    .single();

  if (!user) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const { error } = await supabase
    .from('user')
    .update({ password: hashedPassword, resetToken: null, resetTokenExp: null })
    .eq('id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Password has been reset successfully' });
}
