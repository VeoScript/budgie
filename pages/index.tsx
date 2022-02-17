import type { NextPage, GetServerSideProps } from 'next'
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Loading from '../layouts/loading'
import Layout from '../layouts/default'
import BudgetList from '../components/BudgetList'
import { useSession, getSession } from 'next-auth/react'
import prisma from '../lib/Prisma'

interface TypeProps {
  getUserId: any
}

const Budget: NextPage<TypeProps> = ({ getUserId }) => {

  const { data: session, status } = useSession()

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
          <BudgetList getUserId={getUserId} />
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

  return {
    props: {
      getUserId
    }
  }
}

export default Budget
