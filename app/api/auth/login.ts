import { prisma } from "@/lib/admin/prisma";
import { comparePassword } from "@/lib/admin/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "User not found" });

  const isValid = await comparePassword(password, user.password);
  if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

  return res.status(200).json({ message: "Login successful", userId: user.id });
}
