'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

import { MoonIcon, SunIcon } from './Icon'

import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, settoggleDropDown] = useState(false)

  const handleSignOut = async () => {
    router.push('/')
    await signOut()
    // Redirect to the home page
  }

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()

      setProviders(response)
    }
    setUpProviders()
  }, [])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/ai.jpg"
          width={30}
          height={30}
          className="object-contain"
          alt="prompts for logo"
        />
        <p className="logo_text">Prompts for AI</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            {/* <Link href="/Profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile image"
              />
            </Link> */}

            <motion.a
              href="/Profile"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile image"
              />
            </motion.a>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}

      <div className="sm:hidden flex relative ">
        {session?.user ? (
          <div className="flex">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }}>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile image"
                onClick={() => settoggleDropDown((prev) => !prev)}
              />
            </motion.div>

            {toggleDropdown && (
              <div className="dropdown">
                <a
                  href="/Profile"
                  className="dropdown_link"
                  onClick={() => settoggleDropDown(false)}
                >
                  My Profile
                </a>
                <a
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => settoggleDropDown(false)}
                >
                  Create Prompt
                </a>
                {/* <button
                  onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                  className={`flex items-center justify-center rounded-full p-2
          ${mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'}
          `}
                >
                  {mode === 'dark' ? (
                    <SunIcon className={'fill-dark w-1/2'} />
                  ) : (
                    <MoonIcon className={'fill-dark w-1/2'} />
                  )}
                </button> */}
                <button
                  type="button"
                  onClick={() => {
                    settoggleDropDown(false)
                    signOut()
                    router.push('/')
                  }}
                  className="mt-5 w-full black_btn "
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
