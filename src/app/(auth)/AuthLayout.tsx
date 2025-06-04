'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  // Determine background image
  let bgImage = '/assets/auth-man.png'
  if (
    pathname.includes('recruiter-sign-in') ||
    pathname.includes('recruiter-sign-up')
  ) {
    bgImage = '/assets/auth-woman.png'
  } else if (
    pathname.includes('welcome-onboarding') ||
    pathname.includes('why-onboarding')
  ) {
    bgImage = '/assets/onboarding-woman.png'
  } else if (pathname.includes('recruiter-onboarding')) {
    bgImage = '/assets/onboarding-man.png'
  }

  return (
    <main className='flex h-screen text-white overflow-hidden'>
      {/* Left Image - only on large screens */}
      <div
        className='w-1/2 h-full hidden lg:block bg-cover bg-center p-5'
        style={{
          backgroundImage: `url('${bgImage}')`,
        }}
      >
        <Link href='/'>
          <Image
            src='/assets/portgig-2.svg'
            alt='Portgig Logo'
            width={150}
            height={150}
            className='w-[150px] h-[150px]'
          />
        </Link>
      </div>

      {/* Right Content */}
      <div className='w-full lg:w-1/2 h-full overflow-y-auto bg-primary px-4 sm:px-6 md:px-10 py-10'>
        {children}
      </div>
    </main>
  )
}
