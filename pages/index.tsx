import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { signOut, useSession } from 'next-auth/react'

const Home: NextPage = () => {

  const { data: session, status } = useSession()

  React.useEffect(() => {
    if (!session) {
      Router.push('/signin')
      return
    }
  })

  if (status === "loading") {
    return (
      <React.Fragment>
        <Head>
          <title>Budgie | Loading...</title>
        </Head>
        <div>Loading...</div>
      </React.Fragment>
    )
  }  

  return (
    <React.Fragment>
      <Head>
        <title>Budgie</title>
      </Head>
      {session && (
        <div className="flex flex-col items-center justify-center w-full h-screen space-y-3">
          <h1 className="font-bold text-2xl">Welcome {session.user?.name}</h1>
          <button
            className="fle justify-centerx p-3 bg-red-700 text-white w-full max-w-[10rem]"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      )}
    </React.Fragment>
  )
}

export default Home
