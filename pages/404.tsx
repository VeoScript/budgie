import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

const Custom404 = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <div className="font-poppins flex items-center justify-center w-full h-screen">
        <div className="flex flex-row items-center justify-center w-full max-w-xl space-x-3">
          <Link href="/">
            <a className="flex flex-row items-center space-x-2">
              <Image
                src="/favicon.ico"
                width={35}
                height={35}
                className="rounded-full"
                layout="intrinsic"
                quality={75}
                alt="Profile"
              />
              <h1 className="font-berkshireswash font-bold text-3xl text-mattblack">Budgie</h1>
            </a>  
          </Link>
          <span className="font-light text-lg">| 404 - Sorry page not found.</span>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Custom404