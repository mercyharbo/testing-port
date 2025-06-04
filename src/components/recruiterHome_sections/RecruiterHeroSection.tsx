'use client'

import Image from 'next/image'
import { Buttons } from '../export_components'

const RecruiterHeroSection = () => {
  return (
    <section className='bodyMargin h-fit bg-primary my-5  rounded-2xl gap-5'>
      <div className=' h-full flex '>
        <div className=' flex flex-col justify-center gap-10 p-5 '>
          <h1 className=''>Find Top Talent for Your Next Big Project</h1>
          <p className='lg:text-xl text-white'>
            Discover skilled professionals in design, writing, marketing, and
            more. Hire the best, faster.
          </p>

          <Buttons
            label='Post Jobs'
            className='text-primary lg:text-xl lg:font-bold w-fit'
            onClick={() => {}}
          />
        </div>
        <div className=' w-full flex justify-end items-end max-md:hidden '>
          <Image
            src='/assets/creativehero-1.png'
            alt='creativehero'
            width={400}
            height={400}
            className='object-contain rounded-br-2xl'
          />
        </div>
      </div>
    </section>
  )
}

export default RecruiterHeroSection
