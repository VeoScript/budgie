import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const updateBalance = await prisma.budget.update({
    where: {
      id: req.body.budgetId
    },
    data: {
      balance: req.body.currentBalance,
    }
  })
  res.status(200).json(updateBalance)
}
