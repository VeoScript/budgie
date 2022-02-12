import type { NextPage, GetServerSideProps } from 'next'
import React from 'react'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { getProviders, signIn, useSession } from 'next-auth/react'
import { errors } from '../lib/NextAuthCustomErrors'
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
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div className="flex flex-col items-center w-full space-y-5">
          <h1 className="font-bold text-2xl">Budgie Sign In</h1>
          <div className="flex flex-col items-center w-full space-y-3">
            <div className="flex justify-center w-full">
              <SigninError error={error} errors={errors} />
            </div>
            {Object.values(providers).map((provider: any) => (
              <div className="flex justify-center w-full" key={provider.name}>
                <button
                  className={`p-3 w-full max-w-sm ${provider.name === 'Google' && 'bg-white border border-gray-500'} ${provider.name === 'Facebook' && 'bg-blue-600 text-white'}`}
                  onClick={() => signIn(provider.id)}
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Signin

export const getServerSideProps: GetServerSideProps = async () => {

  const providers = await getProviders()

  return {
    props: {
      providers
    }
  }
}
