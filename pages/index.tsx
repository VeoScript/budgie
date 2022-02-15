import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Layout from '../layouts/default'
import BudgetList from '../components/BudgetList'
import { useSession } from 'next-auth/react'

const Budget: NextPage = () => {

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
        <Layout>
          <BudgetList />
        </Layout>
      )}
    </React.Fragment>
  )
}

export default Budget
