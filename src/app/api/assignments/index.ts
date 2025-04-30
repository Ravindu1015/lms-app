import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // For lecturer: by lecturerId; for student: by studentId->subjects
  const { lecturerId, studentId } = req.query;
  if (lecturerId) {
    const assignments = await prisma.assignment.findMany({
      where: { lecturerId: Number(lecturerId) },
      include: { subject: true }
    });
    return res.json(assignments);
  }
  if (studentId) {
    // Find subjects student is registered in
    const user = await prisma.user.findUnique({
      where: { id: Number(studentId) },
      include: { subjects: true }
    });
    const subjectIds = user?.subjects.map((s: { id: any; }) => s.id) ?? [];
    const assignments = await prisma.assignment.findMany({
      where: { subjectId: { in: subjectIds } },
      include: { subject: true }
    });
    return res.json(assignments);
  }
  res.json([]);
};
