// Authenticated student adds subject
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end()
    const { userId, subjectId } = req.body
    await prisma.user.update({
      where: { id: userId },
      data: { subjects: { connect: { id: subjectId } } }
    })
    res.status(200).json({ message: 'Registered' })
  }
  