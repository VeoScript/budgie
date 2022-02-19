import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const addIncome = await prisma.budgetDetails.create({
    data: {
      type: req.body.getType,
      name: req.body.getName,
      values: req.body.getAmount,
      budgetId: req.body.budgetId
    }
  })
  res.status(200).json(addIncome)
}
