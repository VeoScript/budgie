import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { RiAddLine, RiCloseLine } from 'react-icons/ri'
import Spinner from '../../utils/Spinner'
import DynamicDialog from '../../layouts/dialog'

interface TypeProps {
  budget: any
}

interface FormData {
  name: any
  amount: any
}

// Create Budget Dialog Box Function Component
const AddIncome: React.FC<TypeProps> = ({ budget }) => {

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormData>()

  let [isOpen, setIsOpen] = React.useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    reset()
    setIsOpen(true)
  }

  async function onCreateIncome(formData: FormData) {
    const budgetId = budget.id
    const getType = 'Income'
    const getName = formData.name

    const getAmount = parseInt(formData.amount)
    const getIncome = parseInt(budget.income)
    const getBalance = parseInt(budget.balance)

    const currentIncome = getAmount + getIncome
    const currentBalance = getAmount + getBalance

    if (getAmount === 0) {
      toast('Amount invalid! The amount value must be greater than zero (0).', {
        style: {
          borderRadius: '10px',
          border: '2px solid #1ED760',
          padding: '5px',
          fontSize: '14px',
          background: '#1D1F21',
          color: '#FFFFFF'
        }
      })
      return
    } 

    // api-route for add income or expenses
    await fetch('/api/budget/budget-details/add_income_expense', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        getType,
        getName,
        getAmount,
        budgetId
      })
    })

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

    reset()
    closeModal()
  }

  return (
    <>
      <button
        type='button'
        className="flex flex-row items-center px-3 py-1 space-x-1 outline-none rounded-md text-sm text-white bg-green-700 transition ease-in-out duration-300 hover:bg-opacity-80"
        onClick={openModal}
      >
        <RiAddLine />
        <span>Income</span>
      </button>

      <DynamicDialog
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
      >
        <div className="font-titilliumweb inline-block w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex flex-col w-full">
            <div className="flex flex-row items-center justify-between w-full px-6 py-3 border-b border-zinc-300">
              <h3 className="font-bold text-lg">Add Income</h3>
              <button
                className="outline-none"
                onClick={closeModal}
              >
                <RiCloseLine className="w-5 h-5 text-zinc-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onCreateIncome)} className="block w-full px-6 py-3 space-y-2">
              <label className="block w-full">
                <span className="text-sm text-zinc-800">Income from</span>
                <input
                  type="text"
                  className="form-input outline-none mt-0 block w-full px-0.5 py-2 border-0 border-b border-zinc-300 focus:ring-0 focus:border-blue-600"
                  placeholder="e.g. Work, Salary, Profit etc."
                  {...register("name", { required: true })}
                />
              </label>
              <label className="block w-full">
                <span className="text-sm text-zinc-800">Amount</span>
                <input
                  type="number"
                  className="form-input outline-none mt-0 block w-full px-0.5 py-2 border-0 border-b border-zinc-300 focus:ring-0 focus:border-blue-600"
                  min={0}
                  defaultValue={0}
                  {...register("amount", { required: true })}
                />
              </label>
              <div className="flex items-center justify-end w-full space-x-1">
                <button
                  type="button"
                  className="px-5 py-1.5 outline-none rounded-md bg-zinc-300 text-mattblack transition ease-linear duration-200 hover:bg-opacity-80"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                {isSubmitting && (
                  <div className="px-5 py-1.5 outline-none rounded-md bg-green-700 text-purewhite transition ease-linear duration-200 hover:bg-opacity-80">
                    <Spinner
                      color="#FFFFFF"
                      width={24}
                      height={24}
                    />
                  </div>
                )}
                {!isSubmitting && (
                  <button
                    type="submit"
                    className="px-5 py-1.5 outline-none rounded-md bg-green-700 text-purewhite transition ease-linear duration-200 hover:bg-opacity-80"
                  >
                    Add
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </DynamicDialog>
    </>
  )
}

export default AddIncome