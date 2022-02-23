import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { budgetId } = req.query

  const getBudgetDetails = await prisma.budgetDetails.findMany({
    where: {
      budget: {
        id: String(budgetId)
      }
    },
    orderBy: [{
      counter: 'asc'
    }],
    select: {
      id: true,
      counter: true,
      type: true,
      name: true,
      values: true,
      date: true
    }
  })
  res.status(200).json(getBudgetDetails)
}
