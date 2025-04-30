import prisma from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const assignmentId = Number(req.query.assignmentId);
  const submissions = await prisma.submission.findMany({
    where: { assignmentId },
    include: { student: true }
  });
  res.json(submissions);
};
