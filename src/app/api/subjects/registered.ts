import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = Number(req.query.userId);
  const user = await prisma.user.findUnique({ where: { id: userId }, include: { subjects: true } });
  res.json(user?.subjects || []);
};
