import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { RiArrowGoBackLine } from 'react-icons/ri'

const About: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>About</title>
      </Head>
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div className="flex flex-col items-start justify-center w-full max-w-xl space-y-5">
          <div className="flex flex-row items-center justify-between w-full">
            <h3 className="font-berkshireswash font-bold text-5xl text-mattblack">Budgie</h3>
            <button
              title="Back"
              type="button"
              onClick={() => {
                Router.back()
              }}
            >
              <RiArrowGoBackLine className="w-6 h-6 text-zinc-500 cursor-pointer transition ease-in-out duration-200 transform hover:scale-90" />
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <h5 className="font-semibold text-2xl text-zinc-800">About</h5>
            <p className="font-normal text-justify text-lg">
              Budgie is an open-source project a free personal finance, budget and expense tracking app to monitor your budget plan and daily expenses.
              While using this Application, we may ask you to provide us with certain personally identifiable information that can be used to identify you including your personal budget plan or any kind of details you may input.
            </p>
            <span>
              -&nbsp;
              <Link href="https://github.com/VeoScript" passHref={true}>
                <a className="font-normal text-lg hover:underline" target="_blank">
                  Developer
                </a>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default About