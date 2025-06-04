'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Buttons } from '../export_components'

const DiscoverMore = () => {
  return (
    <section className=' md:flex gap-10 bodyMargin  bg-primary my-5 p-8 rounded-2xl text-white'>
      <div className='w-full flex flex-col gap-5 font-raleway '>
        <h2 className='text-2xl sm:text-3xl md:text-4xl  font-black'>
          Discover and Connect with Creatives in your Industry.
        </h2>
        <h2 className='text-lg  md:text-xl font-bold '>
          Make new Friends, Connect with your Tribe and bring magic to life
        </h2>
        <Link href='/creative-hub'>
          <Buttons
            label='Visit creative Hub'
            className='rounded-lg text-black lg:text-xl w-fit mb-10 md:mb-0 mt-20 ml-10 font-bold font-urbanist'
          />
        </Link>
      </div>

      <div className=' w-full max-md:hidden center'>
        <Image
          src='/assets/group-creative.png'
          alt='discover more creative'
          width={400}
          height={400}
          className=''
        />
      </div>
    </section>
  )
}

export default DiscoverMore
