import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Menu } from '@headlessui/react'
import { signOut, useSession } from 'next-auth/react'
import { RiLayoutMasonryLine, RiPieChartLine, RiAirplayLine } from 'react-icons/ri'

interface SessionProps {
  get_session: any
  getUser: any
}

interface TypeProps {
  getUser: any
}

// Navbar Function Component
const NavBar: React.FC<TypeProps> = ({ getUser }) => {

  const { data: session } = useSession()

  const { pathname } = useRouter()

  return (
    <div className="flex flex-row items-center justify-between w-full px-3 md:px-10 py-3 border-b border-zinc-300">
      <div className="flex justify-start w-full">
        <h1 className="font-berkshireswash font-bold text-xl md:text-2xl cursor-default">Budgie</h1>
      </div>
      <div className="hidden md:flex items-center justify-center w-full space-x-2">
        <div className="flex">
          <Link href="/">
            <a className={`px-3 py-1.5 rounded-md font-semibold text-xs md:text-sm ${pathname === '/' ? 'text-purewhite bg-mattblack' : 'hover:bg-mattblack hover:bg-opacity-10'} transition ease-in-out duration-300`}>
              Budget
            </a>
          </Link>
        </div>
        <div className="flex">
          {/* idisplay dire ang tanang expenses or tanang mga napalit nimo na butang or unsa man gani, kauban pud ug asa kini na belong na budget title */}
          <Link href="/expenses-report">
            <a className={`px-3 py-1.5 rounded-md font-semibold text-sm ${pathname === '/expenses-report' ? 'text-purewhite bg-mattblack' : 'hover:bg-mattblack hover:bg-opacity-10'} transition ease-in-out duration-300`}>
              Expenses Report
            </a>
          </Link>
        </div>
        <div className="flex">
          <Link href="/statistics">
            <a className={`px-3 py-1.5 rounded-md font-semibold text-sm ${pathname === '/statistics' ? 'text-purewhite bg-mattblack' : 'hover:bg-mattblack hover:bg-opacity-10'} transition ease-in-out duration-300`}>
              Statistics
            </a>
          </Link>
        </div>
      </div>
      <div className="md:hidden flex items-center justify-center w-full space-x-2">
        <div className="flex">
          <Link href="/">
            <a title="Budget Plans" className={`px-3 py-1.5 rounded-md font-semibold text-sm ${pathname === '/' ? 'text-purewhite bg-mattblack' : 'hover:bg-mattblack hover:bg-opacity-10'} transition ease-in-out duration-300`}>
              <RiLayoutMasonryLine className="w-6 h-6" />
            </a>
          </Link>
        </div>
        <div className="flex">
          <Link href="/expenses-report">
            <a title="Expenses Report" className={`px-3 py-1.5 rounded-md font-semibold text-sm ${pathname === '/expenses-report' ? 'text-purewhite bg-mattblack' : 'hover:bg-mattblack hover:bg-opacity-10'} transition ease-in-out duration-300`}>
              <RiAirplayLine className="w-6 h-6" />
            </a>
          </Link>
        </div>
        <div className="flex">
          <Link href="/statistics">
            <a title="Statistics" className={`px-3 py-1.5 rounded-md font-semibold text-sm ${pathname === '/statistics' ? 'text-purewhite bg-mattblack' : 'hover:bg-mattblack hover:bg-opacity-10'} transition ease-in-out duration-300`}>
              <RiPieChartLine className="w-6 h-6" />
            </a>
          </Link>
        </div>
      </div>
      <div className="flex justify-end w-full">
        {session && (
          <AccountMenu
            get_session={session}
            getUser={getUser}
          />
        )}
      </div>
    </div>
  )
}

// Menubar Function Component
const AccountMenu: React.FC<SessionProps> = ({ get_session, getUser }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center rounded-full border-2 border-mattblack">
        <Image
          src={ get_session.user && get_session.user?.image }
          width={36}
          height={36}
          className="rounded-full"
          layout="intrinsic"
          quality={75}
          alt="Profile"
        />
      </Menu.Button>
      <Menu.Items className="flex flex-col overflow-hidden absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-zinc-200 focus:outline-none">
        <Menu.Item>
          <Link href="/account">
            <a className="p-3 font-medium text-sm text-left cursor-pointer transition ease-in-out duration-200 hover:bg-zinc-100">
              {getUser.name}
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/about">
            <a className="p-3 font-medium text-sm text-left cursor-pointer transition ease-in-out duration-200 hover:bg-zinc-100">
              About
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`p-3 font-medium text-sm text-left cursor-pointer ${active && 'bg-red-600 text-purewhite  transition ease-in-out duration-200'}`}
              onClick={() => signOut()}
            >
              Sign out
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}

export default NavBar