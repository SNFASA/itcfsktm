"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/admin/ui/input";
import { Button } from "@/components/admin/ui/button";
import { loginUser } from "@/lib/admin/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await loginUser(email, password);
    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
      <h2 className="text-xl font-semibold text-center">Login</h2>
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full">Login</Button>
    </form>
  );
}
