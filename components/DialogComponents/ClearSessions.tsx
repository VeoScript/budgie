import React from 'react'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import { RiCloseLine } from 'react-icons/ri'
import Spinner from '../../utils/Spinner'
import DynamicDialog from '../../layouts/dialog'

interface TypeProps {
  user: any
}

const ClearSessions: React.FC<TypeProps> = ({ user }) => {

  const { handleSubmit, formState: { isSubmitting } } = useForm()

  let [isOpen, setIsOpen] = React.useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  async function onClearSessions() {
    const userId = user.id

    await fetch('/api/auth/user/clear_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    })
    
    closeModal()
    Router.push('/')
  }

  return (
    <>
      <button
        type="button"
        className="hover:underline"
        onClick={openModal}
      >
        Clear Session
      </button>

      <DynamicDialog
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
      >
        <div className="font-titilliumweb inline-block z-50 w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex flex-col w-full">
            <div className="flex flex-row items-center justify-between w-full px-6 py-3 border-b border-zinc-300">
              <h3 className="font-bold text-lg">Clear Sessions</h3>
              <button
                className="outline-none"
                onClick={closeModal}
              >
                <RiCloseLine className="w-5 h-5 text-zinc-500" />
              </button>
            </div>
            <div className="flex items-center w-full p-6">
              <span className="text-center">
                Are you sure you want to clear all of your sessions? This will be cause of signing out your account to all browser your logged in.
              </span>
            </div>
            <div className="flex items-center justify-center w-full space-x-1 px-6 py-3">
              {!isSubmitting && (
                <button
                  type="button"
                  className="px-5 py-1.5 outline-none rounded-md bg-mattblack text-purewhite transition ease-linear duration-200 hover:bg-opacity-80"
                  onClick={handleSubmit(onClearSessions)}
                >
                  Proceed
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
              <button
                type="button"
                className="px-5 py-1.5 outline-none rounded-md bg-zinc-300 text-mattblack transition ease-linear duration-200 hover:bg-opacity-80"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </DynamicDialog>
    </>
  )
}

export default ClearSessions