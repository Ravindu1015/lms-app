import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) return res.status(400).json({error: "Missing fields"});
  const hashed = bcrypt.hashSync(password, 10);
  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role }
    });
    res.status(201).json({ user });
  } catch (e) {
    res.status(400).json({ error: "Email already exists" });
  }
}
