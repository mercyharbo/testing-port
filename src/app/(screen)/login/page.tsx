'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { FaPaintBrush } from 'react-icons/fa'
import { MdWork } from 'react-icons/md'

const SelectRoleModal = () => {
  const [showModal] = useState(true)

  return (
    <div className='relative w-full min-h-screen'>
      <AnimatePresence>
        {showModal && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className='bg-white p-10 rounded-2xl shadow-2xl w-full max-w-[42rem] mx-4 flex flex-col gap-8'
            >
              <div className='w-full text-center'>
                <h2 className='text-3xl font-semibold font-poppins text-gray-800'>
                  We&apos;ve missed you!
                </h2>
                <p className='text-base text-gray-600 mt-3'>
                  Kindly confirm your user type. It&apos;s required to proceed.
                </p>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                {/* Creative Option */}
                <Link href='/sign-in'>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    // onClick={() => handleRedirect('sign-in')}
                    className='group flex-1 bg-white border border-primary/20 rounded-xl shadow-md p-6 h-full cursor-pointer hover:bg-primary transition-all'
                  >
                    <div className='flex items-center gap-5'>
                      <div className='w-16 h-16 rounded-full bg-green-100 flex items-center justify-center'>
                        <FaPaintBrush className='text-green-700 w-7 h-7' />
                      </div>
                      <div className='flex-1'>
                        <p className='text-lg font-semibold text-gray-800 group-hover:text-white'>
                          Creative
                        </p>
                        <p className='text-sm text-gray-600 group-hover:text-white'>
                          Showcase your talent and get hired by top recruiters.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>

                {/* Recruiter Option */}
                <Link href='/recruiter-sign-in'>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className='group flex-1 bg-white border border-primary/20 rounded-xl shadow-md p-6 cursor-pointer h-full hover:bg-gradient-to-r from-blue-100 to-blue-50 transition-all'
                  >
                    <div className='flex items-center gap-5'>
                      <div className='w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center'>
                        <MdWork className='text-blue-700 w-7 h-7' />
                      </div>
                      <div className='flex-1'>
                        <p className='text-lg font-semibold text-gray-800'>
                          Recruiter
                        </p>
                        <p className='text-sm text-gray-600'>
                          Find top creatives and bring your project to life.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SelectRoleModal
