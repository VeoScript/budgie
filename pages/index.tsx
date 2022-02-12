import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import { signIn, signOut, useSession } from 'next-auth/react'

const Home: NextPage = () => {

  const { data: session } = useSession()

  return (
    <React.Fragment>
      <Head>
        <title>Budgie</title>
      </Head>
      <div className="flex flex-row items center justify-center w-full h-screen">
        {session && (
          <div className="flex flex-col items-center justify-center w-full h-full space-y-3">
            <h1 className="font-bold text-2xl">Welcome {session.user?.name}</h1>
            <button
              className="fle justify-centerx p-3 bg-red-700 text-white w-full max-w-[10rem]"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
        )}
        {!session && (
          <div className="flex flex-col items-center justify-center w-full h-full space-y-3">
            <h1 className="font-bold text-2xl">You are not logged in!</h1>
            <button
              className="flex justify-center p-3 bg-blue-700 text-white w-full max-w-[10rem]"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

export default Home
