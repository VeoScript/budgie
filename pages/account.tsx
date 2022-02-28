import { NextPage, GetServerSideProps } from 'next'
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Layout from '../layouts/default'
import AccountComponent from '../components/Account'
import { getSession } from 'next-auth/react'
import prisma from '../lib/Prisma'
import useSWR from 'swr'

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

  const { data: loggedInUser } = useSWR(`/api/auth/user/${user.id}`, fetcher, {
    refreshInterval: 1000,
    fallbackData: user
  })

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
        destination: '/',
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
      location: true
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