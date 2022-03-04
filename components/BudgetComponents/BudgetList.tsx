import React from 'react'
import Link from 'next/link'
import Spinner from '../../utils/Spinner'
import CreateBudget from '../DialogComponents/CreateBudget'

interface TypeProps {
  getUserId: any
  budgets: any
}

// List of Budgets Function Component
const BudgetList: React.FC<TypeProps> = ({ getUserId, budgets }) => {
  return (
    <div className="flex flex-col w-full px-0 md:px-28 py-10 space-y-10 md:space-y-16">
      <div className="flex flex-row items-center justify-between w-full px-3 md:px-5">
        <div className="flex items-center justify-start w-full font-bold text-lg md:text-2xl">
          Budget Plan
        </div>
        <div className="flex items-center justify-center w-full space-x-2 font-bold text-lg md:text-2xl">
          <span>{ budgets && budgets.length }</span>
          <span className="font-light">Budget</span>
        </div>
        <div className="flex items-center justify-end w-full">
          <CreateBudget getUserId={getUserId} />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-row items-center w-full border-b border-zinc-400">
          <div className="flex items-center justify-start px-5 py-2 w-full max-w-xl font-bold text-sm text-zinc-700">
            Budget
          </div>
          <div className="flex items-center justify-center px-5 py-2 w-full max-w-md font-bold text-sm text-zinc-700">
            Total Income
          </div>
          <div className="flex items-center justify-center px-5 py-2 w-full max-w-md font-bold text-sm text-zinc-700">
            Total Expenses
          </div>
          <div className="flex items-center justify-center px-5 py-2 w-full max-w-md font-bold text-sm text-zinc-700">
            Balance
          </div>
        </div>
        {!budgets && (
          <div className="flex flex-col items-center justify-center w-full py-10 border-b border-zinc-400 space-y-2">
            <Spinner
              width={30}
              height={30}
              color="#333333"
            />
            <span className="font-bold">Loading...</span>
          </div>
        )}
        {budgets && (
          <div className="flex flex-col w-full h-full max-h-[20rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-500 scrollbar-track-zinc-300">
            {budgets.length === 0 && (
              <div className="flex flex-col items-center justify-center w-full h-screen space-y-1 border-b border-zinc-400">
                <h3 className="font-bold text-3xl text-zinc-500">Welcome to <span className="font-berkshireswash text-mattblack">Budgie</span></h3>
                <h5 className="font-normal text-base text-zinc-400">Create your first Budget Plan</h5>
              </div>
            )}
            {budgets.map((budget: any) => (
              <Link href={`/my-budget/${budget.id}`} key={ budget.counter }>
                <a className="flex flex-row items-center w-full cursor-pointer divide-x divide-zinc-200 border-b border-zinc-200 transition ease-linear duration-300 hover:bg-zinc-100">
                  <div className="flex items-center justify-start py-4 w-full max-w-xl font-semibold text-xs md:text-lg">
                    <span className="px-5 text-zinc-700">{ budget.name }</span>
                  </div>
                  <div className="flex items-center justify-center py-4 w-full max-w-xl font-normal text-[10px] md:text-base">
                    {budget.income === 0
                      ? <span className="px-3 rounded-md font-poppins text-sm text-zinc-400">No value as of now</span>
                      : <span className="px-3 rounded-md font-poppins text-white bg-green-600">
                          {budget.currency} {budget.income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                    }
                  </div>
                  <div className="flex items-center justify-center py-4 w-full max-w-xl font-normal text-[10px] md:text-base">
                    {budget.expense === 0
                      ? <span className="px-3 rounded-md font-poppins text-sm text-zinc-400">No value as of now</span>
                      : <span className="px-3 rounded-md font-poppins text-white bg-red-700">
                          {budget.currency} {budget.expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                    }
                  </div>
                  <div className="flex items-center justify-center py-4 w-full max-w-xl font-normal text-[10px] md:text-base">
                    {budget.balance === 0
                      ? <span className="px-3 rounded-md font-poppins text-sm text-zinc-400">No value as of now</span>
                      : <span className="px-3 rounded-md font-poppins text-white bg-blue-600">
                          {budget.currency} {budget.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                    }
                  </div>
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BudgetList