import React from 'react'
import Head from 'next/head'
import Spinner from '../utils/Spinner'

const Loading = () => {
  return (
    <React.Fragment>
        <Head>
          <title>Budgie | Loading...</title>
        </Head>
        <div className="flex flex-col items-center justify-center w-full h-screen space-y-5 bg-purewhite">
          <Spinner
            width={50}
            height={50}
            color='#333333'
          />
          <div className="flex flex-row items-center justify-center w-full space-x-2">
            <span className="font-berkshireswash font-bold text-2xl">Budgie</span>
            <span className="font-light text-xl">Loading...</span>
          </div>
        </div>
      </React.Fragment>
  )
}

export default Loading