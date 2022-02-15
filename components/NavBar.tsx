import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Menu } from '@headlessui/react'
import { signOut, useSession } from 'next-auth/react'

interface SessionProps {
  get_session: any
}

// Navbar Function Component
const NavBar = () => {

  const { data: session } = useSession()

  const { pathname } = useRouter()

  return (
    <div className="flex flex-row items-center justify-between w-full px-10 py-3 border-b border-zinc-300">
      <div className="flex">
        <h1 className="font-berkshireswash font-bold text-2xl cursor-default">Budgie</h1>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex">
          <Link href="/">
            <a className={`px-3 py-1.5 rounded-md font-semibold text-sm ${pathname === '/' ? 'text-purewhite bg-mattblack' : 'hover:bg-mattblack hover:bg-opacity-10'} transition ease-in-out duration-300`}>
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
      <div className="flex">
        {session && (
          <AccountMenu get_session={session} />
        )}
      </div>
    </div>
  )
}

// Menubar Function Component
const AccountMenu: React.FC<SessionProps> = ({ get_session }) => {
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
          {({ active }) => (
            <div className={`p-3 font-medium text-sm text-left cursor-pointer ${active && 'bg-zinc-100  transition ease-in-out duration-200'}`}>
              <Link href="/">
                <a>
                  {get_session.user?.name}
                </a>
              </Link>
            </div>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <div className={`p-3 font-medium text-sm text-left cursor-pointer ${active && 'bg-zinc-100  transition ease-in-out duration-200'}`}>
              <Link href="/settings">
                <a>
                  Settings
                </a>
              </Link>
            </div>
          )}
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