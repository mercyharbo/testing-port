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
    <section className="flex flex-col gap-8 font-raleway px-4 sm:px-6 md:px-12 py-6">
      {/* Header */}
      <div className="h-auto p-4 bg-linear-gradient w-full flex items-center rounded-md">
        <h2 className="text-lg sm:text-xl lg:text-3xl font-bold text-white">
          Job Applied
        </h2>
      </div>

      {/* Job Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center h-40">
            <LooadingSpinner className="border-primary w-16 h-16" />
          </div>
        ) : jobsListingData?.data.page_count === 0 ? (
          <div className="col-span-full text-center text-secondary text-lg font-medium">
            No jobs available
          </div>
        ) : (
          jobsListingData?.data.page_data.map((item) => (
            <Link
              href={`/job-hub/${item._id}`}
              key={item._id}
              className="flex flex-col gap-4 p-4 rounded-lg border-2 border-secondary text-secondary hover:shadow-lg transition-shadow duration-300"
            >
              {/* Title and Company */}
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-xl line-clamp-1">{item.title}</h2>
                <h3 className="text-sm text-gray-600">by {item.recruiter.company_name}</h3>
              </div>

              {/* Location and Salary */}
              <div className="flex justify-between text-sm font-semibold">
                <span>{item.location}</span>
                <span>{item.salary_range}</span>
              </div>

              {/* Tags */}
              <div className="flex justify-between text-white text-xs font-bold">
                <div className="bg-secondary rounded-lg py-2 px-3">{item.work_mode}</div>
                <div className="bg-secondary rounded-lg py-2 px-3">{item.experience}</div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* View More Button */}
      <div className="flex justify-end">
        <Link href="/job-hub">
          <Buttons
            label="View more jobs"
            className="!bg-primary w-fit rounded-lg font-bold text-sm lg:text-xl"
          />
        </Link>
      </div>
    </section>
  )
}

export default AvailableJobsComp
