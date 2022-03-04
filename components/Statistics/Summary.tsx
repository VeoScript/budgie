import React from 'react'
import Spinner from '../../utils/Spinner'

interface TypeProps {
  budget: any
  overall_income: any
  overall_expenses: any
  overall_balance: any
}

const Summary: React.FC<TypeProps> = ({ budget, overall_income, overall_expenses, overall_balance }) => {
  return (
    <div className="flex justify-center w-full h-full overflow-hidden border-t md:border-t-0 border-l border-zinc-400">
      <div className="flex flex-col w-full max-w-full">
        <div className="flex flex-col md:flex-row items-center justify-between w-full p-3">
          <h3 className="font-bold text-base md:text-lg">Budget Plan Summary</h3>
          <span className="font-normal text-[11px] md:text-xs">
            Calculate the sum of Incomes, Expenses and Balances
          </span>
        </div>
        {!budget && (
          <div className="flex flex-col items-center justify-center w-full py-10 border-b border-zinc-400 space-y-2">
            <Spinner
              width={30}
              height={30}
              color="#333333"
            />
            <span className="font-bold">Loading...</span>
          </div>
        )}
        {budget.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full h-full p-10">
            <h3 className="font-bold text-lg md:text-2xl text-zinc-500">Budget Plan has no entries yet.</h3>
            <h5 className="font-normal text-xs md:text-base text-zinc-400">Create your Budget Plan first.</h5>
          </div>
        )}
        {budget.length > 0 && (
          <table className="border-collapse text-left cursor-default">
            <thead>
              <tr>
                <th className="border border-zinc-400 p-1">Budget Plan</th>
                <th className="border border-zinc-400 p-1">Incomes</th>
                <th className="border border-zinc-400 p-1">Expenses</th>
                <th className="border border-zinc-400 p-1">Balances</th>
              </tr>
            </thead>
            <tbody>
              {budget.map((budget: {counter: number, currency: string, name: string, income: number, expense: number, balance: number}) => {
                let currency: string

                if (budget.currency === '₱') {
                  currency = 'Currency of PHP - Philippine Peso'
                } else if (budget.currency === '$') {
                  currency = 'Currency of USD - US Dollar'
                } else if (budget.currency === '¥') {
                  currency = 'Currency of JPY - Japanese Yen'
                } else if (budget.currency === '₩') {
                  currency = 'Currency of KRW - Korean Won'
                } else if (budget.currency === '€') {
                  currency = 'Currency of EUR - Euro'
                } else if (budget.currency === '£') {
                  currency = 'Currency of GBP - British Euro'
                } else {
                  currency = ''
                }
                return (
                  <tr title={ currency } key={budget.counter}>
                    <td className="border border-zinc-400 p-1">{ budget.name }</td>
                    <td className="border border-zinc-400 p-1">{ budget.income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</td>
                    <td className="border border-zinc-400 p-1">{ budget.expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</td>
                    <td className="border border-zinc-400 p-1">{ budget.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</td>
                  </tr>
                )
              })}
              <tr>
                <th className="border border-zinc-400 p-1">Overall Costs</th>
                <th className="border border-zinc-400 p-1 bg-green-100">{ overall_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</th>
                <th className="border border-zinc-400 p-1 bg-red-100">{ overall_expenses.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</th>
                <th className="border border-zinc-400 p-1 bg-blue-100">{ overall_balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</th>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Summary