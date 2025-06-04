'use client'

import { jobs } from '@/src/constants'
import AuthStorage from '@/src/lib/requests/auth.new'
import { fetchJobs, selectLoading } from '@/src/redux/features/jobs/jobSlice'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { LooadingSpinner } from '@/src/utils/util_component'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { Buttons } from '../export_components'

const Jobs = () => {
  const dispatch = useAppDispatch()
  const { jobs: jobsListingData } = useAppSelector((state) => state.jobs)
  const loading = useAppSelector(selectLoading)

  const jobsPerPage = 12
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(jobs.length / jobsPerPage)

  const startIndex = currentPage * jobsPerPage
  const endIndex = startIndex + jobsPerPage
  const currentJobs = jobsListingData?.data.page_data.slice(
    startIndex,
    endIndex
  )
  useEffect(() => {
    const isAuthenticated = AuthStorage.isAuthenticated()
    if (isAuthenticated) {
      dispatch(fetchJobs())
    }
  }, [dispatch])

  if (loading) {
    return (
      <div className='h-screen w-full'>
        <LooadingSpinner className='border-primary w-16 h-16' />
      </div>
    )
  }
  return (
    <section className='p-5 flex flex-col gap-3'>
      <header className='flex justify-between items-start w-full'>
        <div className='flex flex-col gap-3'>
          <h2 className='text-textColor text-xl font-bold'>Latest jobs</h2>
          <p className='text-primary text-sm'>
            {jobsListingData?.data.page_count}
          </p>
        </div>

        <Buttons
          label='View all jobs'
          className=' text-textColor underline font-bold cursor-pointer'
          onClick={() => {}}
        />
      </header>

      <section className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'>
        {currentJobs?.map((job) => (
          <Link
            key={job._id}
            className='flex flex-col justify-between gap-5 h-full px-5 py-3 rounded-lg border-2 border-secondary text-secondary cursor-pointer'
            href={`/job-hub/${job._id}`}
          >
            <div className='flex items-center gap-4'>
              {/* <Image
                src={job.comapnyImage}
                alt={job.companyName}
                width={60}
                height={60}
                className='object-contain w-[60px] h-[60px]'
              /> */}
              <div className='flex flex-col flex-1'>
                <h2 className='font-bold text-xl line-clamp-1'>{job.title}</h2>
                <p className='text-sm'>by {job.recruiter.company_name}</p>
              </div>
            </div>
            <div className='flex flex-col gap-2 mt-auto'>
              <div className='flex justify-between text-sm font-bold'>
                <h2>{job.location}</h2>
                <h2>{job.salary_range}</h2>
              </div>
              <div className='flex justify-between text-white text-[10px] font-bold'>
                <div className='bg-secondary rounded-lg py-2 px-3'>
                  {job.work_mode}
                </div>
                <div className='bg-secondary rounded-lg py-2 px-3'>
                  {job.experience}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <div className='flex justify-center gap-4 mt-4'>
        {/* Generate buttons dynamically based on total pages */}
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`h-10 w-10 flex items-center justify-center rounded-full font-semibold font-inter ${
              currentPage === index
                ? 'bg-primary text-white cursor-not-allowed'
                : 'text-secondary hover:bg-accents'
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          className={`h-10 w-10 flex items-center justify-center rounded-full font-semibold border border-accents ${
            currentPage >= totalPages - 1
              ? 'bg-accents cursor-not-allowed'
              : 'text-secondary hover:bg-accents'
          }`}
          disabled={currentPage >= totalPages - 1}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </section>
  )
}

export default Jobs
