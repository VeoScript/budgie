import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { budgetId } = req.query

  const getBudget = await prisma.budget.findFirst({
    where: {
      id: String(budgetId)
    },
    orderBy: [{
      counter: 'asc'
    }],
    select: {
      id: true,
      counter: true,
      name: true,
      currency: true,
      balance: true,
      income: true,
      expense: true,
      user: {
        select: {
          id: true,
          email: true
        }
      }
    }
  })
  res.status(200).json(getBudget)
}
