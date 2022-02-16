import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const createBudget = await prisma.budget.create({
    data: {
      name: req.body.budgetName,
      userId: req.body.userId
    }
  })
  res.status(200).json(createBudget)
}
