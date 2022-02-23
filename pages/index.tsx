import type { NextPage, GetServerSideProps } from 'next'
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Loading from '../layouts/loading'
import Layout from '../layouts/default'
import BudgetList from '../components/BudgetComponents/BudgetList'
import { useSession, getSession } from 'next-auth/react'
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
  getUserId: any
  getBudgets: any
}

const Budget: NextPage<TypeProps> = ({ getUserId, getBudgets }) => {

  const { data: session, status } = useSession()

  // fetch budgets from database on realtime
  const { data: budgets } = useSWR(`/api/budget/${session && getUserId.id}`, fetcher, {
    refreshInterval: 1000,
    fallbackData: getBudgets
  })

  React.useEffect(() => {
    if (!session) {
      Router.push('/signin')
      return
    }
  })

  if (status === "loading") {
    return (
      <Loading />
    )
  }

  return (
    <React.Fragment>
      <Head>
        <title>Budgie</title>
      </Head>
      {session && (
        <Layout>
          <BudgetList
            getUserId={getUserId}
            budgets={budgets}
          />
        </Layout>
      )}
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const session = await getSession(ctx)

  const getUserId = await prisma.user.findFirst({
    where: {
      email: session?.user?.email
    },
    select: {
      id: true
    }
  })

  const getBudgets = await prisma.budget.findMany({
    where: {
      userId: getUserId?.id
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
    }
  })

  return {
    props: {
      getUserId,
      getBudgets
    }
  }
}

export default Budget
