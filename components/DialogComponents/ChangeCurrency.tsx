import React from 'react'
import { useForm } from 'react-hook-form'
import { RiCloseLine } from 'react-icons/ri'
import DynamicDialog from '../../layouts/dialog'
import Spinner from '../../utils/Spinner'

interface TypeProps {
  budget: any
  setIsDropdown: any
}

interface FormData {
  budgetCurrency: string
}

const ChangeCurrency: React.FC<TypeProps> = ({ budget, setIsDropdown }) => {

  const defaultValues = {
    budgetCurrency: budget.currency
  }

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormData>({ defaultValues })

  let [isOpen, setIsOpen] = React.useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
    reset(defaultValues)
  }

  async function onRenameBudget(formData: FormData) {
    const budgetId = budget.id
    const budgetCurrency = formData.budgetCurrency

    await fetch('/api/budget/change_currency', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ budgetId, budgetCurrency })
    })

    reset()
    closeModal()
    setIsDropdown(false)
  }

  return (
    <>
      <button
        type="button"
        className="outline-none p-3 font-medium text-sm text-left cursor-pointer transition ease-in-out duration-200 hover:bg-zinc-100"
        onClick={openModal}
      >
        Change Currency
      </button>

      <DynamicDialog
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
      >
        <div className="font-titilliumweb inline-block z-50 w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex flex-col w-full">
            <div className="flex flex-row items-center justify-between w-full px-6 py-3 border-b border-zinc-300">
              <h3 className="font-bold text-lg">Change Default Currency</h3>
              <button
                className="outline-none"
                onClick={closeModal}
              >
                <RiCloseLine className="w-5 h-5 text-zinc-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onRenameBudget)} className="block w-full px-6 py-3 space-y-2">
              <label className="block w-full">
                <span className="text-base text-zinc-500">Manage your budget plan with specific currency</span>
                <select
                  className="form-input cursor-pointer outline-none mt-0 block w-full px-0.5 py-3 border-0 border-b border-zinc-300 focus:ring-0 focus:border-blue-600"
                  {...register("budgetCurrency", { required: true })}
                >
                  <option value=""></option>
                  <option value="₱">₱ - Peso</option>
                  <option value="$">$ - US Dollar</option>
                  <option value="¥">¥ - Japanese Yen</option>
                  <option value="₩">₩ - Korean Won</option>
                  <option value="€">€ - Euro</option>
                  <option value="£">£ - British Pound</option>
                </select>
              </label>
              <div className="flex items-center justify-end w-full space-x-1">
                <button
                  type="button"
                  className="px-5 py-1.5 outline-none rounded-md bg-zinc-300 text-mattblack transition ease-linear duration-200 hover:bg-opacity-80"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                {!isSubmitting && (
                  <button
                    type="submit"
                    className="px-5 py-1.5 outline-none rounded-md bg-blue-600 text-purewhite transition ease-linear duration-200 hover:bg-opacity-80"
                  >
                    Save
                  </button>
                )}
                {isSubmitting && (
                  <div className="px-5 py-1.5 outline-none rounded-md bg-blue-600 text-purewhite transition ease-linear duration-200 hover:bg-opacity-80">
                    <Spinner
                      color="#FFFFFF"
                      width={24}
                      height={24}
                    />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </DynamicDialog>
    </>
  )
}

export default ChangeCurrency