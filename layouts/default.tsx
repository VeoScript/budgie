import React from 'react'
import NavBar from '../components/NavBar'

interface TypeProps {
  children: any
}

const Layout: React.FC<TypeProps> = ({ children }) => {
  return (
    <div className="font-titilliumweb flex flex-col w-full h-screen overflow-hidden">
      <NavBar />
      { children }
    </div>
  )
}

export default Layout