import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const updateTotalIncome = await prisma.budget.update({
    where: {
      id: req.body.budgetId
    },
    data: {
      income: req.body.currentIncome
    }
  })
  res.status(200).json(updateTotalIncome)
}
