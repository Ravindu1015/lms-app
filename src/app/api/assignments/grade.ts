import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end();
  const { submissionId, grade } = req.body;
  const updated = await prisma.submission.update({
    where: { id: submissionId },
    data: { grade }
  });
  res.json(updated);
};
