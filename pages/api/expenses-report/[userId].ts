import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { userId } = req.query

  const getBudget = await prisma.budget.findMany({
    where: {
      userId: String(userId)
    },
    orderBy: [{
      counter: 'desc'
    }],
    select: {
      id: true,
      counter: true,
      name: true,
      currency: true,
      balance: true,
      income: true,
      expense: true,
      budgetDetails: {
        select: {
          id: true,
          name: true,
          type: true,
          values: true,
          date: true
        }
      }
    },
  })

  res.status(200).json(getBudget)
}
