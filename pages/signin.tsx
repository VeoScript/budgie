import type { NextPage, GetServerSideProps } from 'next'
import React from 'react'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { getProviders, signIn, useSession } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { RiFacebookFill  } from 'react-icons/ri'
import { errors } from '../utils/NextAuthCustomErrors'
import SigninError from '../components/SigninError'

interface TypeProps {
  providers: any
}

const Signin: NextPage<TypeProps> = ({ providers }) => {

  const { data: session, status } = useSession()

  const { error } = useRouter().query

  React.useEffect(() => {
    if (session) {
      Router.push('/')
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
        <title>Budgie | Sign in</title>
      </Head>
      <div className="font-titilliumweb flex flex-row items-center justify-between px-32 w-full h-screen bg-white">
        <div className="flex flex-col items-start justify-center w-full">
          <div className="flex flex-col items-start space-y-5">
            <h1 className="font-berkshireswash font-bold text-6xl text-mattblack">Budgie</h1>
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-2xl text-mattblack">
                Your personal Budget Tracker & Planner
              </p>
              <p className="font-normal text-xl text-gray-500">
                100% Free and Easy to use.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center w-full">
          <div className="flex flex-col items-end w-full max-w-sm space-y-2">
            {Object.values(providers).map((provider: any) => (
              <div className="flex w-full" key={provider.name}>
                <button
                  className={`flex items-center space-x-5 p-3 rounded-md w-full max-w-xs ${provider.name === 'Google' && 'bg-white border border-gray-500'} ${provider.name === 'Facebook' && 'bg-blue-600 text-white'}`}
                  onClick={() => signIn(provider.id)}
                >
                  {provider.name === 'Google' && (
                    <FcGoogle className="w-5 h-5" />
                  )}
                  {provider.name === 'Facebook' && (
                    <RiFacebookFill className="w-5 h-5 text-white" />
                  )}
                  <span>Sign in with {provider.name}</span>
                </button>
              </div>
            ))}
            <div className="flex w-full text-xs text-red-500">
              <SigninError error={error} errors={errors} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {

  const providers = await getProviders()

  return {
    props: {
      providers
    }
  }
}

export default Signin
