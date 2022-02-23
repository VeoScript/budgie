import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const changeCurrency = await prisma.budget.update({
    where: {
      id: req.body.budgetId
    },
    data: {
      currency: req.body.budgetCurrency
    }
  })
  res.status(200).json(changeCurrency)
}
