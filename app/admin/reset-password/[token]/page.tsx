"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const { token } = useParams();
  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/auth/reset", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });
    setDone(true);
    setTimeout(() => router.push("/login"), 2000);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Reset Password</h1>
      {done ? (
        <p className="mt-4 text-green-600">Password reset successfully!</p>
      ) : (
        <form onSubmit={handleReset} className="space-y-4 mt-4">
          <input
            className="w-full border rounded p-2"
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}
