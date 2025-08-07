'use client';
import { Input } from '@/components/admin/ui/input';
import { Button } from '@/components/admin/ui/button';
import { useState } from 'react';
export default function ForgotPage() {
  const [email, setEmail] = useState('');
  const handleSubmit = async () => {
    const res = await fetch('/api/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    alert(data.message || data.error);
  };
  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-xl mb-4">Forgot Password</h2>
      <Input placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={handleSubmit} className="mt-4 w-full">Send Reset Link</Button>
    </div>
  );
}