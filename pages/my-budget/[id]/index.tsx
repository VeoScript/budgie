import type { NextPage, GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Loading from '../../../layouts/loading'
import Layout from '../../../layouts/default'
import BudgetDetails from '../../../components/BudgetComponents/BudgetDetails'
import { Toaster } from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import prisma from '../../../lib/Prisma'
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
  params: any
  get_budget: any
  get_budget_details: any
}

const BudgetID: NextPage<TypeProps> = ({ params, get_budget, get_budget_details }) => {

  const { data: session, status } = useSession()

  // fetch budgets from database on realtime
  const { data: budget } = useSWR(`/api/budget/income-expense/${session && params.id}`, fetcher, {
    refreshInterval: 1000,
    fallbackData: get_budget
  })

  // fetch budget details including income and expenses from database on realtime
  const { data: budgets_details } = useSWR(`/api/budget/budget-details/${get_budget.id}`, fetcher, {
    refreshInterval: 1000,
    fallbackData: get_budget_details
  })

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      Router.push('/signin')
      return
    }
  })

  if (status === "loading") {
    return (
      <Loading />
    )
  }

  // check if this budget is from the authenticated user...
  if (get_budget.user.email !== session?.user?.email) {
    Router.push('/')
    return (
      <Loading />
    )
  }

  return (
    <React.Fragment>
      <Head>
        <title>{ get_budget.name }</title>
      </Head>
      <Layout
        getUser={get_budget.user}
      >
        <Toaster position='bottom-left' />
        <BudgetDetails
          budget={budget}
          budget_details={budgets_details}
        />
      </Layout>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {

  const { params } = ctx

  const get_budget = await prisma.budget.findFirst({
    where: {
      id: String(params?.id)
    },
    orderBy: [{
      counter: 'asc'
    }],
    select: {
      id: true,
      counter: true,
      name: true,
      currency: true,
      balance: true,
      income: true,
      expense: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true
        }
      }
    }
  })

  const get_budget_details = await prisma.budgetDetails.findMany({
    where: {
      budget: {
        id: String(params?.id)
      }
    },
    orderBy: [{
      counter: 'asc'
    }],
    select: {
      id: true,
      counter: true,
      type: true,
      name: true,
      values: true,
      date: true
    }
  })

  if (!get_budget) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      params,
      get_budget,
      get_budget_details
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  
  const budgets = await prisma.budget.findMany({
    select: {
      id: true,
    }
  })

  return {
    paths: budgets.map((budget: any) => ({
      params: {
        id: budget.id
      }
    })),
    fallback: 'blocking'
  }
}

export default BudgetID