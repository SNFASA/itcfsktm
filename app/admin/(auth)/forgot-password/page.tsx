"use client";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { useState } from "react";

export default function ForgotPage() {
  const [email, setEmail] = useState("");

  const requestReset = async () => {
    const res = await fetch("/api/auth/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 space-y-4 border shadow rounded-xl">
        <h2 className="text-2xl font-semibold text-center">Forgot Password</h2>
        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Button className="w-full" onClick={requestReset}>Send Reset Link</Button>
      </div>
    </div>
  );
}
