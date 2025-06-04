'use client'

import { Buttons } from '@/src/components/export_components'
import { fetchRecruiterJobs } from '@/src/redux/features/jobs/GetCreatorsSlice'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { cn } from '@/src/utils/cn'
import { LooadingSpinner } from '@/src/utils/util_component'
import Link from 'next/link'
import { useEffect } from 'react'

export default function ExploreCreative() {
  const dispatch = useAppDispatch()
  const { jobs, loading, error } = useAppSelector(
    (state) => state.recruiterJobs
  )

  useEffect(() => {
    dispatch(fetchRecruiterJobs())
  }, [dispatch])

  if (loading) {
    return (
      <div className={cn('flex justify-center items-center h-full my-5')}>
        <LooadingSpinner className={cn('border-primary w-16 h-16')} />
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn('flex flex-col items-center gap-4 my-5')}>
        <p className={cn('text-red-500 text-lg')}>{error}</p>
        <button
          onClick={() => dispatch(fetchRecruiterJobs())}
          className={cn('bg-primary text-white px-4 py-2 rounded-lg')}
        >
          Retry
        </button>
      </div>
    )
  }

  if (jobs?.data.page_count === 0) {
    return (
      <div className={cn('flex flex-col items-center gap-4 my-5')}>
        <p className={cn('text-gray-500 text-lg')}>No jobs found.</p>
        <button
          onClick={() => dispatch(fetchRecruiterJobs())}
          className={cn('bg-primary text-white px-4 py-2 rounded-lg')}
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <section className={cn('bodyMargin flex flex-col gap-5')}>
      <h2 className={cn('font-bold text-3xl')}>Explore Jobs</h2>
      {/* Jobs */}
      <div
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 font-raleway'
        )}
      >
        {jobs?.data.page_data.map((job) => (
          <div
            key={job._id}
            className={cn(
              'flex flex-col gap-2 pb-5 px-5 rounded-lg shadow-lg bg-white text-primary'
            )}
          >
            <div className={cn('flex justify-between items-center')}>
              <div className={cn('h-[100px] w-[100px] bg-gray-200 rounded')}>
                {/* Placeholder for job image, if needed */}
              </div>
              <div
                className={cn(
                  'bg-secondary/70 text-white py-2 px-5 font-ramaraja w-32 md:w-36 text-center'
                )}
              >
                {job.experience}
              </div>
            </div>
            <h2 className={cn('font-bold text-sm px-5')}>{job.title}</h2>
            <h3 className={cn('font-extralight text-sm px-5 line-clamp-1')}>
              {job.industry} / {job.location}
            </h3>
            <div
              className={cn(
                'h-14 p-1 border border-gray-100 bg-gray-50 text-primary text-xs line-clamp-3'
              )}
            >
              {job.description}
            </div>
            <div className={cn('flex justify-between px-2 mt-5')}>
              <button
                className={cn(
                  'py-2 px-5 w-fit rounded-lg text-sm font-medium bg-primary text-white cursor-pointer'
                )}
              >
                View Job
              </button>
              <button
                className={cn(
                  'py-2 px-5 w-fit rounded-lg text-sm font-medium bg-primary text-white cursor-pointer'
                )}
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link href='/creative-hub'>
        <Buttons
          label='Visit Creatives Hub'
          className={cn(
            '!bg-primary w-fit self-end rounded-lg font-bold text-xl'
          )}
        />
      </Link>
    </section>
  )
}
