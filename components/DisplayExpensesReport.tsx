import React from 'react'
import Link from 'next/link'
import PrintPreview from './Print/PrintPreview'
import Spinner from '../utils/Spinner'

interface TypeProps {
  getUser: any
  getBudget: any
}

const DisplayExpensesReport: React.FC<TypeProps> = ({ getUser, getBudget }) => {
  return (
    <div className="flex flex-col w-full px-28 py-10 space-y-10">
      <div className="flex flex-row items-center justify-between w-full px-5">
        <div className="flex items-center justify-start w-full font-bold text-2xl">
          Expenses Report
        </div>
        <div className="flex items-center justify-end w-full font-light text-lg">
          Print your Expenses Report
        </div>
      </div>
      {!getBudget && (
        <div className="flex flex-col items-center justify-center w-full py-10 space-y-2">
          <Spinner
            width={30}
            height={30}
            color="#333333"
          />
          <span className="font-bold">Loading...</span>
        </div>
      )}
      {getBudget && (
        <div className="flex flex-col w-full h-full max-h-[20rem] space-y-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-500 scrollbar-track-zinc-300">
          {getBudget.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full h-screen">
              <h3 className="font-bold text-3xl text-zinc-500">Welcome to <span className="font-berkshireswash text-mattblack">Budgie</span></h3>
              <h5 className="font-normal text-base text-zinc-400">You have no expenses report right now.</h5>
            </div>
          )}
          {getBudget.map((budget: { id: string, name: string, counter: string, currency: string, expense: number, budgetDetails: any }) => {
            const getBudgetDetails = budget.budgetDetails.map(((expenses: { type: string }) => expenses.type === 'Expense'))
            const getExpenses = getBudgetDetails.filter((value: boolean) => value === true)
            return (
              <div key={budget.counter} className="flex flex-row items-center w-full cursor-default rounded-md divide-x divide-zinc-400 border border-zinc-400">
                <div className="flex items-center justify-start px-5 py-2 w-full max-w-xl font-bold text-lg text-zinc-700">
                  {budget.name}
                </div>
                <div className="flex items-center justify-start px-5 py-2 w-full max-w-[10rem] font-bold text-lg text-zinc-700">
                  <span className="font-light text-sm">Expenses:</span>&nbsp;{getExpenses.length}
                </div>
                <div className="flex items-center justify-start px-5 py-2 w-full max-w-full text-zinc-700">
                  <span className="font-light text-sm">Total Amount Expenses:</span>
                  <span className="font-poppins font-bold text-lg">
                    &nbsp;{budget.currency}&nbsp;{budget.expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </div>
                <div className="flex items-center justify-center px-5 py-2 w-full max-w-[10rem] text-zinc-700">
                  <div className="flex items-center justify-start w-full space-x-1">
                    <Link href={`/my-budget/${budget.id}`}>
                      <a className="outline-none rounded-md px-3 py-1 space-x-2 text-sm text-purewhite bg-green-700 transition ease-in-out duration-100 hover:bg-opacity-80">
                        View
                      </a>
                    </Link>
                    {getExpenses.length > 0 && (
                      <PrintPreview
                        user={getUser}
                        budget={budget}
                        budgetDetails={budget.budgetDetails}
                      />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default DisplayExpensesReport