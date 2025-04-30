import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const lecturerId = Number(req.query.lecturerId);
  // Subjects where this lecturer has at least one lecture or assignment
  const subjects = await prisma.subject.findMany({
    where: {
      OR: [
        { lectures: { some: { lecturerId } } },
        { assignments: { some: { lecturerId } } }
      ]
    }
  });
  res.json(subjects);
};
