"use client";
import { useState } from "react";
import { Input } from "@/components/admin/ui/input";
import { Button } from "@/components/admin/ui/button";
import { requestResetPassword } from "@/lib/admin/auth";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await requestResetPassword(email);
    setMessage(result.message);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
      <h2 className="text-xl font-semibold text-center">Forgot Password</h2>
      <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Button type="submit" className="w-full">Send Reset Link</Button>
      {message && <p className="text-sm text-green-600 text-center">{message}</p>}
    </form>
  );
}
