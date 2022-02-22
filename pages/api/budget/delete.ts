import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const deleteBudget = await prisma.budget.delete({
    where:{
      id: req.body.budgetId
    },
  })
  res.status(200).json(deleteBudget)
}
