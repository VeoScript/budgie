import React from 'react'
import CreateBudget from './DialogComponents/CreateBudget'

interface TypeProps {
  getUserId: any
}

// List of Budgets Function Component
const BudgetList: React.FC<TypeProps> = ({ getUserId }) => {
  return (
    <div className="flex flex-col w-full px-28 py-10 space-y-16">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex items-center justify-start w-full font-bold text-2xl">
          Your Budget List
        </div>
        <div className="flex items-center justify-center w-full space-x-2 font-bold text-2xl">
          <span>0</span>
          <span className="font-light">Budget</span>
        </div>
        <div className="flex items-center justify-end w-full font-bold text-base">
          <CreateBudget getUserId={getUserId} />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-row items-center w-full divide-x divide-zinc-300 border-b border-zinc-300">
          <div className="flex items-center justify-center py-2 w-full max-w-xl font-bold text-lg text-zinc-700">
            Budget Name
          </div>
          <div className="flex items-center justify-center py-2 w-full max-w-md font-bold text-lg text-zinc-700">
            Total Income
          </div>
          <div className="flex items-center justify-center py-2 w-full max-w-md font-bold text-lg text-zinc-700">
            Total Expenses
          </div>
          <div className="flex items-center justify-center py-2 w-full max-w-md font-bold text-lg text-zinc-700">
            Balance
          </div>
        </div>
      </div>
    </div>
  )
}

export default BudgetList