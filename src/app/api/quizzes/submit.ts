import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end();
  const { quizId, studentId, attempt } = req.body;
  // Could be Prisma model Submission, or a new QuizSubmission
  const submission = await prisma.quizSubmission.create({
    data: { quizId, studentId, attempt }
  });
  res.json(submission);
};
