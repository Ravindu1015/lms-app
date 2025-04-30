import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { name, email, password, role } = req.body

  const hashed = bcrypt.hashSync(password, 10)
  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role }
    })
    res.status(201).json({ user })
  } catch (e) {
    res.status(400).json({ error: 'Registration failed.' })
  }
}
