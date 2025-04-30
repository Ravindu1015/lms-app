import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end();
  const { assignmentId, studentId, content } = req.body;
  const sub = await prisma.submission.create({
    data: { assignmentId, studentId, content }
  });
  res.json(sub);
};
