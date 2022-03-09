import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { userId } = req.query

  const getUser = await prisma.user.findFirst({
    where: {
      email: String(userId)
    },
    select: {
      id: true,
      image: true,
      name: true,
      email: true,
      username: true,
      location: true,
      sessions: {
        select: {
          id: true
        }
      }
    }
  })

  res.status(200).json(getUser)
}
