import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end();
  const { title, description, subjectId, lecturerId } = req.body;
  const assignment = await prisma.assignment.create({
    data: { title, description, subjectId, lecturerId }
  });
  res.json(assignment);
};
