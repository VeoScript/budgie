import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Layout from '../layouts/default'

const About: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Settings</title>
      </Head>
      <div className="flex flex-row items-center justify-center w-full h-full">
        <h3 className="font-bold">About Page</h3>
      </div>
    </React.Fragment>
  )
}

export default About