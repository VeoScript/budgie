import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Layout from '../layouts/default'

const Settings: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Settings</title>
      </Head>
      <Layout>
        <div className="flex flex-row items-center justify-center w-full h-full">
          <h3 className="font-bold">Settings</h3>
        </div>
      </Layout>
    </React.Fragment>
  )
}

export default Settings