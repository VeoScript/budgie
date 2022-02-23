import React from 'react'
import { useForm } from 'react-hook-form'
import { RiDeleteBinLine } from 'react-icons/ri'
import ResetBudget from '../DialogComponents/ResetBudget'
import Spinner from '../../utils/Spinner'
import Moment from 'react-moment'

interface TypeProps {
  budget: any
  budget_details: any
}

// Display Income and Expenses Component
const DisplayIncomeAndExpenses: React.FC<TypeProps> = ({ budget, budget_details }) => {

  const { handleSubmit, formState: { isSubmitting } } = useForm()

  const onDelete = async (budget: any, get_budget: any) => {
    const budgetId = budget.id
    const getBalance = budget.balance
    const getIncome = budget.income
    const getExpense = budget.expense
    const budgetAmount = get_budget.values

    let currentBalance
    let currentIncome
    let currentExpenses

    // if the type of budget is Income then it will be your Balance minus your deleted Amount (Syempre ibabawas nya yung amount ng mga dinelete mong income)
    if (get_budget.type === 'Income') {
      currentBalance = getBalance - budgetAmount
      currentIncome = getIncome - budgetAmount

      // api-route for update the current balance
      await fetch('/api/budget/budget-details/update_balance', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ budgetId, currentBalance })
      })

      // api-route for update the total income
      await fetch('/api/budget/budget-details/update_total_income', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ budgetId, currentIncome })
      })
    }

    // if the type of budget is Expense then it will be your Balance plus your deleted Amount (Syempre idadag nya yung amount ng mga dinelete mong expenses)
    if (get_budget.type === 'Expense') {
      currentBalance = getBalance + budgetAmount
      currentExpenses = getExpense - budgetAmount

      // api-route for update the current balance
      await fetch('/api/budget/budget-details/update_balance', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ budgetId, currentBalance })
      })

      // api-route for update the total expenses
      await fetch('/api/budget/budget-details/update_total_expense', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ budgetId, currentExpenses })
      })
    }
    
    await fetch('/api/budget/budget-details/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ budgetDetailsId: get_budget.id })
    })
  }

  return (
    <React.Fragment>
      {/* Dynamic Controls Area */}
      {!isSubmitting && (
        <div className="flex flex-col w-full h-full max-h-[28rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-500 scrollbar-track-zinc-300">
          {budget_details.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <h3 className="font-bold text-2xl text-zinc-500">Budget Plan has no entries yet.</h3>
              <h5 className="font-normal text-base text-zinc-400">Add your first Income</h5>
            </div>
          )}
          {budget_details.map((get_budget: any) => (
            <div className={`${get_budget.type === 'Income' ? 'bg-green-100' : 'bg-red-100'} flex flex-row items-center w-full divide-x divide-zinc-400 border-b border-zinc-400`} key={get_budget.counter}>
              <div className="flex items-center w-full max-w-[12rem] px-3">
                {get_budget.type}
              </div>
              <div className="flex items-center w-full max-w-full p-3">
                {get_budget.name}
              </div>
              <div className="flex items-center w-full max-w-[15rem] p-3">
                {budget.currency} {get_budget.values.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
              <div className="flex items-center w-full max-w-[15rem] p-3">
                <Moment date={ get_budget.date } format="lll" />
              </div>
              <div className="flex items-center justify-center w-full max-w-[8rem] py-1 space-x-5">
                <button
                  type="button"
                  className="flex flex-col items-center text-zinc-700"
                  onClick={handleSubmit(() => onDelete(budget, get_budget))}
                >
                  <RiDeleteBinLine className="w-5 h-5" />
                  <span className="font-light text-xs">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {isSubmitting && (
        <div className="flex flex-col items-center justify-center w-full h-full space-y-2">
          <Spinner
            color="#333333"
            width={40}
            height={40}
          />
          <span className="font-light text-zinc-700">Loading...</span>
        </div>
      )}
      {/* Table Footer Area */}
      <div className="flex flex-row items-center justify-between w-full p-3 border-t border-zinc-400">
        <div className="flex items-center justify-start w-full space-x-2 divide-x divide-zinc-400">
          <div className="flex items-center space-x-1 px-2 text-sm">
            <span className="font-light text-zinc-500">Total Income:</span>
            <span className="font-bold text-zinc-800">{budget.currency} {budget.income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          </div>
          <div className="flex items-center space-x-1 px-2 text-sm">
            <span className="font-light text-zinc-500">Total Expenses:</span>
            <span className="font-bold text-zinc-800">{budget.currency} {budget.expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          </div>
        </div>
        <div className="flex items-center justify-end w-full space-x-2">
          <span className="font-light text-xs text-zinc-3000">If there is any problem about the computation, try to reset your budget plan.</span>
          <ResetBudget
            budget={budget}
          />
        </div>
      </div>
   </React.Fragment>
  )
}

export default DisplayIncomeAndExpenses