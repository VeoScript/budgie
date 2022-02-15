import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { RiCloseLine } from 'react-icons/ri'

// Create Budget Dialog Box Function Component
const CreateBudget = () => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button
        type="button"
        className="px-5 py-1.5 rounded-md bg-blue-600 text-purewhite transition ease-linear duration-200 hover:bg-opacity-80"
        onClick={openModal}
      >
        Create Budget
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-mattblack bg-opacity-20"
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
              <div className="font-titilliumweb inline-block w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex flex-col w-full">
                  <div className="flex flex-row items-center justify-between w-full px-6 py-3 border-b border-zinc-300">
                    <h3 className="font-bold text-lg">Create Budget</h3>
                    <button
                      onClick={closeModal}
                    >
                      <RiCloseLine className="w-5 h-5 text-zinc-500" />
                    </button>
                  </div>
                  <div className="block w-full px-6 py-3 space-y-2">
                    <label className="block w-full">
                      <span className="text-sm">Name of your budget - E.g. Home, Car, Utilities, etc.</span>
                      <input
                        type="text"
                        className="form-input mt-0 block w-full px-0.5 border-0 border-b border-zinc-300 focus:ring-0 focus:border-blue-600"
                        
                      />
                    </label>
                    <div className="flex items-center justify-end w-full space-x-1">
                      <button
                        type="button"
                        className="px-5 py-1.5 rounded-md bg-zinc-300 text-mattblack transition ease-linear duration-200 hover:bg-opacity-80"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="px-5 py-1.5 rounded-md bg-blue-600 text-purewhite transition ease-linear duration-200 hover:bg-opacity-80"
                      >
                        Add
                      </button>
                    </div>
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

export default CreateBudget