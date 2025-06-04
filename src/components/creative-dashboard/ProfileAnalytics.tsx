'use client'

import { useAppSelector } from '@/src/redux/hooks'
import Link from 'next/link'

const ProfileAnalytics = () => {
  const { profile } = useAppSelector((state) => state.user)

  return (
    <section className="bodyMargin py-8 text-primary font-raleway">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Profile Views */}
        <div className="flex flex-col gap-4 items-center md:items-start flex-1">
          <h2 className="font-bold text-2xl md:text-3xl">Profile Analytics</h2>
          <div className="flex flex-col p-6 justify-center bg-primary rounded-lg text-white w-48 sm:w-64 md:w-72">
            <h3 className="text-xs sm:text-sm md:text-lg">How many profile views</h3>
            <h2 className="font-bold text-center text-lg sm:text-2xl md:text-4xl">
              {profile?.profile_views ?? 0}
            </h2>
          </div>
        </div>

        {/* Last 30 Days */}
        <div className="flex flex-col gap-4 items-center md:items-start flex-1">
          <h2 className="font-bold text-2xl md:text-3xl">Last 30 days</h2>
          <Link
            href="/creative-dashboard/viewed-by"
            className="flex flex-col p-6 justify-center bg-primary rounded-lg text-white w-48 sm:w-64 md:w-72 cursor-pointer hover:bg-primary/90 transition"
          >
            <h3 className="text-xs sm:text-sm md:text-lg">How many profile views</h3>
            <span className="font-bold text-center text-lg sm:text-2xl md:text-4xl">
              {profile?.profile_views ?? 0}
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProfileAnalytics
