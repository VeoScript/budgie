import React from 'react'
import Image from 'next/image'
import Router from 'next/router'
import Spinner from '../utils/Spinner'
import { MdVerified } from 'react-icons/md'
import { useForm } from 'react-hook-form'

interface TypeProps {
  budget: any
  loggedInUser: any
}

interface FormData {
  name: string
  email: string
  username: string
  location: string
}

const Account: React.FC<TypeProps> = ({ budget, loggedInUser }) => {

  const defaultValues = {
    name: loggedInUser.name,
    email: loggedInUser.email,
    username: loggedInUser.username,
    location: loggedInUser.location
  }

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormData>({ defaultValues }) 

  const onUpdateProfile = async (formData: FormData) => {
    const userId = loggedInUser.id
    const name = formData.name
    const username = formData.username
    const location = formData.location

    await fetch('/api/auth/user/update_user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        username,
        location,
        userId
      })
    })

    Router.replace(Router.asPath)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-3 md:px-[20rem] my-10 md:mt-0">
      <div className="flex flex-col items-center justify-center w-full space-y-10">
        <div className="flex flex-row items-center w-full space-x-5 md:space-x-10">
          <Image
            src={ loggedInUser.image }
            width={150}
            height={150}
            className="rounded-full"
            layout="intrinsic"
            quality={75}
            alt="Profile"
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-3xl">{loggedInUser.name}</h1>
              {budget.length >= 3 && (
                <MdVerified className="w-6 h-6 text-blue-600" />
              )}
            </div>
            <div className="flex items-center">
              <h3 className="font-light text-xl text-zinc-500">
                {budget.length >= 3 ? 'Budgie Loyal Friend' : 'Budgie Friend'}
              </h3>
            </div>
            <div className="flex items-center space-x-2 mt-5">
              <span className="font-light text-sm">Your Budget Plan:</span>
              <span className="font-bold text-sm">{budget.length}</span>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onUpdateProfile)} className="flex flex-col md:flex-row justify-center w-full space-x-0 md:space-x-5 space-y-5 md:space-y-0">
          <div className="flex flex-col w-full space-y-3">
            <label className="block w-full">
              <span className="text-sm text-zinc-500">Display Name</span>
              <input
                type="text"
                className="form-input outline-none mt-0 block w-full px-0.5 py-2 text-lg border-0 border-b border-zinc-300 focus:ring-0 focus:border-blue-600"
                placeholder="Change your name"
                {...register("name", { required: true })}
              />
            </label>
            <label className="block w-full">
              <span className="text-sm text-zinc-500">Username</span>
              <input
                type="text"
                className="form-input outline-none mt-0 block w-full px-0.5 py-2 text-lg border-0 border-b border-zinc-300 focus:ring-0 focus:border-blue-600"
                placeholder="Add username"
                {...register("username")}
              />
            </label> 
          </div>
          <div className="flex flex-col w-full space-y-3">
            <label className="block w-full">
              <span className="text-sm text-zinc-500">Location</span>
              <input
                type="text"
                className="form-input outline-none mt-0 block w-full px-0.5 py-2 text-lg border-0 border-b border-zinc-300 focus:ring-0 focus:border-blue-600"
                placeholder="e.g. Manila, Philippines"
                {...register("location")}
              />
            </label> 
            <label className="block w-full">
              <span className="text-sm text-zinc-500">Email</span>
              <input
                disabled
                type="text"
                className="form-input outline-none mt-0 block w-full px-0.5 py-2 text-lg border-0 border-b border-zinc-300 focus:ring-0 focus:border-blue-600 disabled:bg-white"
                {...register("email")}
              />
            </label>
            <div className="flex items-center justify-end w-full pt-3 space-x-1">
              <button
                type="button"
                className="px-5 py-1.5 outline-none rounded-md bg-zinc-300 text-mattblack transition ease-linear duration-200 hover:bg-opacity-80"
                onClick={() => {
                  reset(defaultValues)
                }}
              >
                Cancel
              </button>
              {isSubmitting && (
                <div className="px-5 py-1.5 outline-none rounded-md bg-blue-700 text-purewhite transition ease-linear duration-200 hover:bg-opacity-80">
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
                  className="px-5 py-1.5 outline-none rounded-md bg-blue-700 text-purewhite transition ease-linear duration-200 hover:bg-opacity-80"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Account