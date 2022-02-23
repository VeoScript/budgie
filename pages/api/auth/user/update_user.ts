import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const updateUser = await prisma.user.update({
    where:{
      id: req.body.userId
    },
    data: {
      name: req.body.name,
      username: req.body.username,
      location: req.body.location
    }
  })
  res.status(200).json(updateUser)
}
