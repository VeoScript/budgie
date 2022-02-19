import React from 'react'
import { useForm } from 'react-hook-form'
import { RiAddLine, RiCheckboxBlankLine, RiCheckboxLine, RiDeleteBinLine, RiSaveLine } from 'react-icons/ri'
import AddIncome from '../DialogComponents/AddIncome'
import AddExpense from '../DialogComponents/AddExpense'
import Spinner from '../../utils/Spinner'

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
      <div className="flex flex-col w-full h-full max-h-[28rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-500 scrollbar-track-zinc-300">
        {budget_details.map((get_budget: any) => (
          <div className="flex flex-row items-center w-full divide-x border-b border-zinc-300" key={get_budget.counter}>
            <div className="flex items-center w-full px-3">
              {get_budget.type}
            </div>
            <div className="flex items-center w-full p-3">
              {get_budget.name}
            </div>
            <div className="flex items-center w-full p-3">
              {get_budget.values}
            </div>
            <div className="flex items-center justify-center w-full max-w-[10rem] py-1 space-x-5">
              <button className="flex flex-col items-center text-zinc-700">
                {/* <RiCheckboxLine className="w-6 h-6" /> */}
                <RiCheckboxBlankLine className="w-6 h-6" />
                <span className="font-light text-xs">Paid</span>
              </button>
              {!isSubmitting && (
                <button
                  type="button"
                  className="flex flex-col items-center text-zinc-700"
                  onClick={handleSubmit(() => onDelete(budget, get_budget))}
                >
                  <RiDeleteBinLine className="w-6 h-6" />
                  <span className="font-light text-xs">Delete</span>
                </button>
              )}
              {isSubmitting && (
                <Spinner
                  color="#333333"
                  width={24}
                  height={24}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Table Footer Area */}
      <div className="flex flex-row items-center justify-end w-full p-3 border-t border-zinc-300">
        <div className="flex items-center justify-start w-full space-x-2 divide-x">
          <div className="flex items-center space-x-1 px-2 text-sm">
            <span className="font-light text-zinc-500">Total Income:</span>
            <span className="font-bold text-zinc-800">₱ {budget.income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          </div>
          <div className="flex items-center space-x-1 px-2 text-sm">
            <span className="font-light text-zinc-500">Total Expenses:</span>
            <span className="font-bold text-zinc-800">₱ {budget.expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          </div>
          <div className="flex items-center space-x-1 px-2 text-sm">
            <span className="font-light text-zinc-500">Paid:</span>
            <span className="font-bold text-zinc-800">₱ 0.00</span>
          </div>
        </div>
        <div className="flex items-center justify-end w-full space-x-1">
          <AddIncome budget={budget} />
          <AddExpense budget={budget} />
        </div>
      </div>
   </React.Fragment>
  )
}

export default DisplayIncomeAndExpenses