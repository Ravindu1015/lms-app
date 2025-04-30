import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end();
  const { question, answer, subjectId, lecturerId, deadline } = req.body;
  const quiz = await prisma.quiz.create({
    data: { question, answer, subjectId, lecturerId, deadline: new Date(deadline) }
  });
  res.json(quiz);
};
