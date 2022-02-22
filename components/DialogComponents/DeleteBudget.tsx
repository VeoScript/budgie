import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import { RiCloseLine } from 'react-icons/ri'
import Spinner from '../../utils/Spinner'

interface TypeProps {
  budget: any
  setIsDropdown: any
}

const DeleteBudget: React.FC<TypeProps> = ({ budget, setIsDropdown }) => {

  const { handleSubmit, formState: { isSubmitting } } = useForm()

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  async function onDeleteBudget() {
    const budgetId = budget.id

    await fetch('/api/budget/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ budgetId })
    })
    
    closeModal()
    setIsDropdown(false)
    Router.push('/')
  }

  return (
    <>
      <button
        type="button"
        className="outline-none p-3 font-medium text-sm text-left cursor-pointer transition ease-in-out duration-200 hover:bg-zinc-100"
        onClick={openModal}
      >
        Delete
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto bg-mattblack bg-opacity-20"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="font-titilliumweb inline-block z-50 w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex flex-col w-full">
                  <div className="flex flex-row items-center justify-between w-full px-6 py-3 border-b border-zinc-300">
                    <h3 className="font-bold text-lg">Delete Budget Plan</h3>
                    <button
                      className="outline-none"
                      onClick={closeModal}
                    >
                      <RiCloseLine className="w-5 h-5 text-zinc-500" />
                    </button>
                  </div>
                  <div className="flex items-center w-full p-6">
                    <span className="text-center">
                      Are you sure you want to permanently delete&nbsp;
                      <span className="font-bold">{ budget.name }</span>
                      &nbsp;budget plan?
                    </span>
                  </div>
                  <div className="flex items-center justify-center w-full space-x-1 px-6 py-3">
                    <button
                      type="button"
                      className="px-5 py-1.5 outline-none rounded-md bg-zinc-300 text-mattblack transition ease-linear duration-200 hover:bg-opacity-80"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    {!isSubmitting && (
                      <button
                        type="button"
                        className="px-5 py-1.5 outline-none rounded-md bg-red-600 text-purewhite transition ease-linear duration-200 hover:bg-opacity-80"
                        onClick={handleSubmit(onDeleteBudget)}
                      >
                        Delete
                      </button>
                    )}
                    {isSubmitting && (
                      <div className="px-5 py-1.5 outline-none rounded-md bg-red-600 text-purewhite transition ease-linear duration-200 hover:bg-opacity-80">
                        <Spinner
                          color="#FFFFFF"
                          width={24}
                          height={24}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default DeleteBudget