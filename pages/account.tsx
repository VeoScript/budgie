import { NextPage, GetServerSideProps } from 'next'
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Layout from '../layouts/default'
import AccountComponent from '../components/Account'
import { useSession, getSession } from 'next-auth/react'
import prisma from '../lib/Prisma'
import useSWR from 'swr'
import Loading from '../layouts/loading'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

interface TypeProps {
  user: any
  budget: any
}

const Account: NextPage<TypeProps> = ({ user, budget }) => {

  const { data: session, status } = useSession()

  const { data: loggedInUser } = useSWR(`/api/auth/user/${session && user.id}`, fetcher, {
    refreshInterval: 1000,
    fallbackData: user
  })

  if (status === "loading") {
    return (
      <Loading />
    )
  }

  return (
    <React.Fragment>
      <Head>
        <title>{ loggedInUser.name }</title>
      </Head>
      <Layout
        getUser={user}
      >
        <AccountComponent
          budget={budget}
          loggedInUser={loggedInUser}
        />
      </Layout>
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email
    },
    select: {
      id: true,
      image: true,
      name: true,
      email: true,
      username: true,
      location: true,
      sessions: {
        select: {
          id: true
        }
      }
    }
  })

  const budget = await prisma.budget.findMany({
    where: {
      userId: String(user?.id)
    },
    select: {
      counter: true
    }
  })

  return {
    props: {
      user,
      budget
    }
  }
}

export default Account