import { NextPage, GetServerSideProps } from 'next'
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Layout from '../layouts/default'
import DoughnutChart from '../components/Statistics/DoughnutChart'
import Summary from '../components/Statistics/Summary'
import prisma from '../lib/Prisma'
import useSWR from 'swr'
import { useSession, getSession } from 'next-auth/react'
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

const Statistics: NextPage<TypeProps> = ({ user, budget }) => {

  const { data: session, status } = useSession()

  // fetch budgets from database on realtime
  const { data: get_budget } = useSWR(`/api/budget/statistics/${session && user.id}`, fetcher, {
    refreshInterval: 1000,
    fallbackData: budget
  })

  if (status === "loading") {
    return (
      <Loading />
    )
  }

  const all_budget = get_budget.map((budget: { income: number, expense: number, balance: number }) => {
    return {
      income: budget.income,
      expense: budget.expense,
      balance: budget.balance
    }
  })

  const overall_income = all_budget.reduce(function(accumulator: any, currentValue: any) {
    return accumulator + currentValue.income
  }, 0)

  const overall_expenses = all_budget.reduce(function(accumulator: any, currentValue: any) {
    return accumulator + currentValue.expense
  }, 0)

  const overall_balance = all_budget.reduce(function(accumulator: any, currentValue: any) {
    return accumulator + currentValue.balance
  }, 0)

  return (
    <React.Fragment>
      <Head>
        <title>Budgie (Statistics)</title>
      </Head>
      <Layout
        getUser={user}
      >
        <div className="flex flex-col w-full h-full overflow-y-auto px-0 md:px-28 py-10 space-y-10">
          <div className="flex flex-row items-center justify-between w-full px-5">
            <div className="flex items-center justify-start w-full font-bold text-xl md:text-2xl">
              Statistics
            </div>
            <div className="flex items-center justify-end w-full font-light text-sm md:text-lg">
              Overall Budget Plan Statistic Chart
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start w-full space-x-0 md:space-x-5 rounded-md border border-zinc-400">
            <DoughnutChart
              overall_income={overall_income}
              overall_expenses={overall_expenses}
              overall_balance={overall_balance}              
            />
            <Summary
              budget={get_budget}
              overall_income={overall_income}
              overall_expenses={overall_expenses}
              overall_balance={overall_balance}              
            />
          </div>
        </div>
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
      id: true,
      counter: true,
      name: true,
      currency: true,
      income: true,
      expense: true,
      balance: true
    }
  })

  return {
    props: {
      user,
      budget
    }
  }
}

export default Statistics