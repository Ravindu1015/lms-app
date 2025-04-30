import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end();
  const { title, content, subjectId, lecturerId } = req.body;
  const data = await prisma.lecture.create({
    data: { title, content, subjectId, lecturerId }
  });
  res.json(data);
};
