import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const clearSessions = await prisma.session.deleteMany({
    where:{
      user: {
        id: req.body.userId
      }
    }
  })
  res.status(200).json(clearSessions)
}
