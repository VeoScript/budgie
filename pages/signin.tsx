import type { NextPage, GetServerSideProps } from 'next'
import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Router, { useRouter } from 'next/router'
import Loading from '../layouts/loading'
import { getProviders, signIn, getSession, useSession } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { RiFacebookFill  } from 'react-icons/ri'
import { errors } from '../utils/NextAuthCustomErrors'
import SigninError from '../components/SigninError'

interface TypeProps {
  providers: any
}

const Signin: NextPage<TypeProps> = ({ providers }) => {

  const { status } = useSession()

  const { error } = useRouter().query

  // if (status === "loading") {
  //   return (
  //     <Loading />
  //   )
  // }  

  return (
    <React.Fragment>
      <Head>
        <title>Budgie (Sign in)</title>
      </Head>
      <div className="font-titilliumweb cursor-default flex justify-center w-full h-screen overflow-hidden bg-white">
        <div className="flex flex-col items-center justify-between px-10 md:px-32 w-full max-w-[2400px] h-full">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full h-full space-y-10 md:space-y-0 mt-5">
            <div className="flex flex-col items-start justify-center w-full">
              <div className="flex flex-col items-start space-y-5">
                <div className="flex flex-row items-center space-x-2">
                  <Image
                    src="/favicon.ico"
                    width={55}
                    height={55}
                    className="rounded-full"
                    layout="intrinsic"
                    quality={75}
                    alt="Profile"
                  />
                  <h1 className="font-berkshireswash font-bold text-6xl text-mattblack">Budgie</h1>
                </div>
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
            <div className="flex flex-col items-start md:items-end justify-center w-full">
              <div className="flex flex-col items-end w-full max-w-sm space-y-2">
                <div className="flex items-center justify-start w-full mb-2">
                  <h3 className="font-bold text-xl text-zinc-800">
                    Start your budget plan.
                  </h3>
                </div>
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
          <div className="flex items-center justify-center w-full p-5">
            <p className="font-light text-xs">
              &copy; { new Date().getFullYear() }, All rights reserved. <span className="font-bold">Budgie</span> by VEOSCRIPT.
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const providers = await getProviders()

  const session = await getSession(ctx)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      providers
    }
  }
}

export default Signin
