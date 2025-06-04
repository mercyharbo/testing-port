'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineClose } from 'react-icons/ai'
import { navigationItems } from '../constants'
import AuthStorage from '../lib/requests/auth.new'
import { fetchRecruiterProfile } from '../redux/features/user/recruiterSlice'
import { fetchUserProfile } from '../redux/features/user/userSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import NavLink from './NavLink'

const NavigationBar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { profile } = useAppSelector((state) => state.user)
  const { recruiterProfile } = useAppSelector((state) => state.recruiter)
  const [userType] = useState(AuthStorage.getUserType())
  const [profileModal, setProfileModal] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)

  const handleProfileContextmenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setProfileModal(!profileModal)
  }

  const handleUserLogout = () => {
    setIsLoggingOut(true)
    toast.success('Logging out...')
    AuthStorage.clearAuth()

    setTimeout(() => {
      router.push('/login')
    }, 2500)
  }

  useEffect(() => {
    // Only fetch profile if user is authenticated
    const isAuthenticated = AuthStorage.isAuthenticated()

    if (isAuthenticated) {
      if (userType === 'recruiter') {
        dispatch(fetchRecruiterProfile())
      } else {
        dispatch(fetchUserProfile())
      }
    }
  }, [dispatch, userType])

  return (
    <nav className='sticky w-full top-0 z-50 h-14 text-primary bg-white'>
      <div className='bodyMargin h-full flex items-center justify-between'>
        {/* Left side - Logo */}
        <div className='flex items-center'>
          <Link href='/'>
            <Image
              src='/assets/PortgigLogo.png'
              alt='Portgig Logo'
              quality={100}
              width={100}
              height={70}
              className='cursor-pointer'
            />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className='max-lg:hidden w-[700px] font-semibold text-primary text-[18px] font-urbanist'>
          <ul className='flex justify-between'>
            {navigationItems.map((item, index) => (
              <NavLink href={item.link} key={index}>
                <li
                  className={`cursor-pointer hover:underline hover:decoration-primary pb-1 ${
                    pathname === item.link ? 'border-b-2 border-primary' : ''
                  }`}
                >
                  {item.label}
                </li>
              </NavLink>
            ))}
          </ul>
        </div>

        {/* Right side - Profile/Auth buttons for desktop, Menu button for mobile */}
        <div className='flex items-center'>
          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className='lg:hidden'>
            <Image
              src='/assets/nav-menu.svg'
              alt='Menu Icon'
              width={32}
              height={32}
            />
          </button>

          {/* Desktop Profile or Sign up / Login */}
          {!profile && !recruiterProfile ? (
            <div className='max-lg:hidden !bg-primary text-white rounded-full text-center text-sm cursor-pointer px-4 py-2 flex items-center justify-center gap-2'>
              <Link href='/onboarding'>Sign up</Link>
              <span>/</span>
              <Link href='/login'>Log in</Link>
            </div>
          ) : (
            <div className='relative max-lg:hidden'>
              <button
                type='button'
                onClick={handleProfileContextmenu}
                className='!bg-primary text-white rounded-full text-center text-sm capitalize cursor-pointer px-4 py-2 flex items-center justify-center gap-2'
              >
                <span>
                  Hey,{' '}
                  {profile?.bio_data?.user_name ||
                    recruiterProfile?.bio_data.full_name}
                </span>
              </button>

              {profileModal && (
                <div className='absolute top-14 left-0 bg-white rounded-lg px-2 py-1 w-[150px] z-50 flex flex-col justify-start items-start gap-3'>
                  <button
                    type='button'
                    onClick={handleUserLogout}
                    disabled={isLoggingOut}
                    className='h-12 px-4 rounded-md w-full hover:bg-gray-200 cursor-pointer disabled:opacity-50'
                  >
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className='fixed inset-0 bg-black bg-opacity-40 z-40'
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Sidebar */}
            <motion.div
              className='fixed top-0 left-0 w-[250px] h-full bg-white shadow-lg z-50 flex flex-col gap-8 px-6 py-10'
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className='flex justify-between items-center'>
                <Link href='/'>
                  <Image
                    src='/assets/PortgigLogo.png'
                    alt='Portgig Logo'
                    quality={100}
                    width={100}
                    height={70}
                    className='cursor-pointer'
                  />
                </Link>
                <button onClick={toggleMobileMenu}>
                  <AiOutlineClose className='w-6 h-6 text-black' />
                </button>
              </div>

              <ul className='flex flex-col gap-6 text-lg font-medium text-primary'>
                {navigationItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.link}
                      className={`block ${
                        pathname === item.link
                          ? 'text-primary font-bold'
                          : 'text-gray-700'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className='mt-auto'>
                {!profile && !recruiterProfile ? (
                  <div className='flex gap-3'>
                    <Link
                      href='/onboarding'
                      className='bg-primary text-white py-2 px-4 rounded-full text-sm'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                    <Link
                      href='/login'
                      className='border border-primary text-primary py-2 px-4 rounded-full text-sm'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleUserLogout}
                    className='text-left w-full text-red-500 mt-4'
                  >
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default NavigationBar
