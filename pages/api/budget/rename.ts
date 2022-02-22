import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const renameBudget = await prisma.budget.update({
    where: {
      id: req.body.budgetId
    },
    data: {
      name: req.body.budgetName
    }
  })
  res.status(200).json(renameBudget)
}
