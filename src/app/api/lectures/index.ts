import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { lecturerId } = req.query;
  let lectures;
  if (lecturerId) {
    lectures = await prisma.lecture.findMany({
      where: { lecturerId: Number(lecturerId) },
      include: { subject: true }
    });
  } else {
    lectures = await prisma.lecture.findMany({ include: { subject: true } });
  }
  res.json(lectures);
};
