import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  await prisma.budgetDetails.deleteMany({
    where:{
      budgetId: req.body.budgetId
    },
  })

  const updateBalance = await prisma.budget.update({
    where:{
      id: req.body.budgetId
    },
    data: {
      income: 0,
      expense: 0,
      balance: 0
    }
  })
  res.status(200).json(updateBalance)
}
