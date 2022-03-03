import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { budgetId } = req.query

  const getBudget = await prisma.budget.findMany({
    where: {
      userId: String(budgetId)
    },
    select: {
      id: true,
      counter: true,
      name: true,
      currency: true,
      income: true,
      expense: true,
      balance: true
    }
  })
  res.status(200).json(getBudget)
}
