import React from 'react'
import NavBar from '../components/NavBar'

interface TypeProps {
  children: any
  getUser: any
}

const Layout: React.FC<TypeProps> = ({ children, getUser }) => {
  return (
    <div className="font-titilliumweb flex flex-col w-full h-screen overflow-hidden">
      <NavBar getUser={getUser} />
      { children }
    </div>
  )
}

export default Layout