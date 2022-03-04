import { NextPage, GetServerSideProps } from 'next'
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Layout from '../layouts/default'
import DisplayExpensesReport from '../components/DisplayExpensesReport'
import { useSession, getSession } from 'next-auth/react'
import useSWR from 'swr'
import prisma from '../lib/Prisma'
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
  getUser: any
  getBudget: any
}

const ExpensesReport: NextPage<TypeProps> = ({ getUser, getBudget }) => {

  const { data: session, status } = useSession()

  const { data: user } = useSWR(`/api/auth/user/${session && getUser.id}`, fetcher, {
    refreshInterval: 1000,
    fallbackData: getUser
  })

  const { data: budget } = useSWR(`/api/expenses-report/${getUser.id}`, fetcher, {
    refreshInterval: 1000,
    fallbackData: getBudget
  })

  if (status === "loading") {
    return (
      <Loading />
    )
  }

  return (
    <React.Fragment>
      <Head>
        <title>Budgie (Expenses Report)</title>
      </Head>
      <Layout
        getUser={user}        
      >
        <DisplayExpensesReport
          getUser={user}
          getBudget={budget}
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
  
  const getUser = await prisma.user.findFirst({
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

  const getBudget = await prisma.budget.findMany({
    where: {
      userId: getUser?.id
    },
    orderBy: [{
      counter: 'desc'
    }],
    select: {
      id: true,
      counter: true,
      name: true,
      currency: true,
      balance: true,
      income: true,
      expense: true,
      budgetDetails: {
        select: {
          id: true,
          name: true,
          type: true,
          values: true,
          date: true
        }
      }
    },
  })

  return {
    props: {
      session,
      getUser,
      getBudget
    }
  }
}

export default ExpensesReport