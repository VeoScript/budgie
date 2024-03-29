import React from 'react'
import NavBar from '../components/NavBar'

interface TypeProps {
  children: any
  getUser: any
}

const Layout: React.FC<TypeProps> = ({ children, getUser }) => {
  return (
    <div className="font-titilliumweb flex justify-center w-full h-screen overflow-y-auto md:overflow-hidden">
      <div className="flex flex-col items-center w-full max-w-[1401px] h-full">
        <NavBar getUser={getUser} />
        { children }
      </div>
    </div>
  )
}

export default Layout
