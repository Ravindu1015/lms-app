import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const quizzes = await prisma.quiz.findMany({ include: { subject: true } });
  res.json(quizzes);
};

