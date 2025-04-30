import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end();
  const { userId, subjectId } = req.body;
  await prisma.user.update({
    where: { id: userId },
    data: { subjects: { connect: { id: subjectId } } }
  });
  res.json({ ok: true });
};
