'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Buttons } from '../export_components'

const CreativeDashboardHero = () => {
  const links = [
    { label: 'Edit Profile', path: '/creative-dashboard/edit-profile' },
    { label: 'Search for new job', path: '' },
    {
      label: 'Create/Edit your Portfolio',
      path: '/creative-dashboard/edit-portfolio',
    },
    { label: 'Messages', path: '' },
  ]

  return (
    <section className="bg-primary text-white py-10 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Text Block */}
          <div className="border-2 border-white rounded-lg p-6 sm:p-8 lg:p-10 w-full lg:max-w-xl">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold font-raleway text-white">
              Hi, Sophia
            </h2>
            <p className="text-sm sm:text-base lg:text-lg font-inter mt-2">
              Your creativity is your superpower! 🚀 Keep building, keep
              innovating, and let your work speak for itself. The right
              opportunity is just around the corner—go grab it!
            </p>
          </div>

          {/* Image */}
          <div className="w-full max-w-xs">
            <Image
              src="/assets/creative.svg"
              alt="Discover more creatives"
              width={400}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Subheading */}
        <h2 className="text-xs sm:text-sm font-raleway text-center lg:text-left">
          Let’s dive in
        </h2>

        {/* Buttons Section */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-5">
          {links.map((link, index) => (
            <Link key={index} href={link.path}>
              <Buttons
                label={link.label}
                className="w-[140px] sm:w-[180px] md:w-[200px] lg:w-[250px] !text-primary text-[10px] sm:text-xs md:text-sm lg:text-xl font-bold cursor-pointer font-raleway"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CreativeDashboardHero
