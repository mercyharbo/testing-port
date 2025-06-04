'use client'

import { fetchJobs, selectLoading } from '@/src/redux/features/jobs/jobSlice'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { LooadingSpinner } from '@/src/utils/util_component'
import Link from 'next/link'
import { useEffect } from 'react'
import { Buttons } from '../export_components'

const AvailableJobsComp = () => {
  const dispatch = useAppDispatch()
  const { jobs: jobsListingData } = useAppSelector((state) => state.jobs)
  const loading = useAppSelector(selectLoading)

  useEffect(() => {
    dispatch(fetchJobs())
  }, [dispatch])

  return (
    <section className='flex flex-col gap-6 font-raleway'>
      <div className='flex items-center bodyMargin'>
        <h2 className='text-lg sm:text-xl lg:text-2xl font-extrabold pl-4 sm:pl-10 text-[#00489A]'>
          Explore jobs
        </h2>
      </div>

      <div className='bodyMargin grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {loading ? (
          <div className='col-span-full flex justify-center items-center h-64'>
            <LooadingSpinner className='border-primary w-16 h-16' />
          </div>
        ) : jobsListingData?.data.page_count === 0 ? (
          <div className='col-span-full flex items-center justify-center min-h-[300px]'>
            <div className='text-center text-secondary text-lg sm:text-2xl font-semibold bg-gray-100 p-6 rounded-lg shadow-md'>
              No jobs available
            </div>
          </div>
        ) : (
          jobsListingData?.data.page_data.map((item) => (
            <div
              key={item._id}
              className='flex flex-col gap-4 px-4 py-3 rounded-lg border-2 border-secondary text-secondary hover:shadow-lg transition-shadow duration-300'
            >
              <div className='flex justify-between items-start'>
                <div className='flex flex-col max-w-full'>
                  <h2 className='font-bold text-base sm:text-lg md:text-2xl line-clamp-1 text-gray-800'>
                    {item.title}
                  </h2>
                  <h2 className='text-sm text-gray-600'>
                    by {item.recruiter.full_name}
                  </h2>
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <div className='flex justify-between text-xs font-bold text-gray-700'>
                  <h4>{item.location}</h4>
                </div>
                <div className='flex justify-between text-white text-[10px] font-bold gap-2'>
                  <div className='bg-secondary rounded-lg py-1 px-3 text-[11px]'>
                    {item.work_mode}
                  </div>
                  <div className='bg-secondary rounded-lg py-1 px-3 text-[11px]'>
                    {item.experience}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className='bodyMargin flex justify-end'>
        <Link href='/job-hub'>
          <Buttons
            label='Find more jobs'
            className='!bg-primary w-fit rounded-lg font-bold text-sm lg:text-xl text-white hover:bg-opacity-90 transition'
          />
        </Link>
      </div>
    </section>
  )
}

export default AvailableJobsComp
