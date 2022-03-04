import React from 'react'
import { useForm } from 'react-hook-form'
import DynamicDialog from '../../layouts/dialog'
import { RiCloseLine } from 'react-icons/ri'
import Spinner from '../../utils/Spinner'

interface TypeProps {
  getUserId: any
}

interface FormData {
  budgetName: string
}

// Create Budget Dialog Box Function Component
const CreateBudget: React.FC<TypeProps> = ({ getUserId }) => {

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormData>()

  let [isOpen, setIsOpen] = React.useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    reset()
    setIsOpen(true)
  }

  async function onCreateBudget(formData: FormData) {
    const budgetName = formData.budgetName
    const userId = getUserId.id

    await fetch('/api/budget/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ budgetName, userId })
    })

    reset()
    closeModal()
  }

  return (
    <>
      <button
        type="button"
        className="px-3 md:px-5 py-1 md:py-1.5 outline-none rounded-md bg-mattblack text-sm text-purewhite transition ease-linear duration-200 hover:bg-opacity-80"
        onClick={openModal}
      >
        Create Budget
      </button>

      <DynamicDialog
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
      >
        <div className="font-titilliumweb inline-block w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex flex-col w-full">
            <div className="flex flex-row items-center justify-between w-full px-6 py-3 border-b border-zinc-300">
              <h3 className="font-bold text-lg">Create Budget Plan</h3>
              <button
                className="outline-none"
                onClick={closeModal}
              >
                <RiCloseLine className="w-5 h-5 text-zinc-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onCreateBudget)} className="block w-full px-6 py-3 space-y-2">
              <label className="block w-full">
                <span className="text-sm">e.g. Monthly Expenses, Business, Car, House etc.</span>
                <input
                  type="text"
                  className="form-input outline-none mt-0 block w-full px-0.5 py-3 border-0 border-b border-zinc-300 focus:ring-0 focus:border-blue-600"
                  {...register("budgetName", { required: true })}
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
                {!isSubmitting && (
                  <button
                    type="submit"
                    className="px-5 py-1.5 outline-none rounded-md bg-mattblack text-purewhite transition ease-linear duration-200 hover:bg-opacity-80"
                  >
                    Add
                  </button>
                )}
                {isSubmitting && (
                  <div className="px-5 py-1.5 outline-none rounded-md bg-mattblack text-purewhite transition ease-linear duration-200 hover:bg-opacity-80">
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

export default CreateBudget