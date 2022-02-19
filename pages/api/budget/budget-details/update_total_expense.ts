import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const updateTotalExpenses = await prisma.budget.update({
    where: {
      id: req.body.budgetId
    },
    data: {
      expense: req.body.currentExpenses
    }
  })
  res.status(200).json(updateTotalExpenses)
}
