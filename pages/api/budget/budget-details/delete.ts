import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const deleteIncomeExpense = await prisma.budgetDetails.delete({
    where:{
      id: req.body.budgetDetailsId
    },
  })
  res.status(200).json(deleteIncomeExpense)
}
