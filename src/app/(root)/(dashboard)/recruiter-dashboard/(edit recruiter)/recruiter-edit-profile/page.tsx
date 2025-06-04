'use client'

import { Buttons } from '@/src/components/export_components'
import { RecruiterAuth } from '@/src/lib/requests/auth.new'
import { useAppSelector } from '@/src/redux/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'
import { LooadingSpinner } from '@/src/utils/util_component'

// Custom URL schema to allow empty strings or valid URLs
const optionalUrlSchema = z
  .string()
  .optional()
  .refine((val) => !val || z.string().url().safeParse(val).success, {
    message: 'Invalid URL',
  })

const formSchema = z.object({
  fullName: z.string().optional(),
  location: z.string().optional(),
  company_name: z.string().optional(),
  instagram: optionalUrlSchema,
  linkedin: optionalUrlSchema,
  website: optionalUrlSchema,
  about_us: z.string().max(1000, 'Max 1000 characters').optional(),
})

type FormData = z.infer<typeof formSchema>

const RecruiterEditProfile = () => {
  const { recruiterProfile, loading } = useAppSelector(
    (state) => state.recruiter
  )
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      location: '',
      company_name: '',
      instagram: '',
      linkedin: '',
      website: '',
      about_us: '',
    },
  })

  // Load profile data into form
  useEffect(() => {
    if (recruiterProfile) {
      reset({
        fullName: recruiterProfile.bio_data?.full_name || '',
        location: recruiterProfile.profile?.location || '',
        company_name: recruiterProfile.company_info?.company_name || '',
        instagram: recruiterProfile.profile?.instagram || '',
        linkedin: recruiterProfile.profile?.linkedin || '',
        website: recruiterProfile.profile?.website || '',
        about_us: recruiterProfile.company_info?.about_us || '',
      })
    }
  }, [recruiterProfile, reset])

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setErrorMessage(null)

    const payload = {
      profile: {
        full_name: data.fullName ?? '',
        location: data.location ?? '',
        company_name: data.company_name ?? '',
        instagram: data.instagram ?? '',
        linkedin: data.linkedin ?? '',
        website: data.website ?? '',
        about_us: data.about_us ?? '',
      },
    }

    try {
      const res = await RecruiterAuth.updateProfile(payload, 'PROFILE')

      if (res.status === 200) {
        toast.success(res.message)
        setTimeout(() => {
          window.location.reload()
        }, 2500)
      } else {
        const errorMsg = res.message || 'Failed to update profile'
        setErrorMessage(errorMsg)
        toast.error(errorMsg)
      }
    } catch (error) {
      const errorMsg =
        (error as Error).message ||
        'An error occurred while updating the profile'
      setErrorMessage(errorMsg)
      toast.error(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center h-full my-5'>
        <LooadingSpinner className='border-primary w-16 h-16' />
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col text-black gap-5 font-inter'
    >
      <h2 className='subHeading'>Edit profile</h2>
      {/* profile image */}
      <div className='w-full bg-white p-3 rounded-lg shadow'>
        <div className='flex items-center gap-5 px-3 py-3'>
          <div className='h-30 w-30 rounded-full border border-secondary'>
            <Image
              src='/assets/creativeImage.svg'
              alt='profile image'
              width={100}
              height={100}
              className='lg:h-36 lg:w-36'
            />
          </div>
          <div className='flex flex-col gap-2 items-start'>
            <Buttons
              label='Upload New Photo'
              className='rounded-2xl text-sm'
              onClick={() => {}}
            />
            <input
              name='profileImage'
              type='file'
              accept='image/*'
              className='text-xs'
              disabled={loading || isLoading}
            />
            <p className='text-[8px]'>
              At least 800x 800 px is recommended JPG or PNG
            </p>
          </div>
        </div>
      </div>
      {/* 2nd container */}
      <div className='bg-white shadow rounded-lg p-3 flex flex-col gap-5'>
        {/* personal info */}
        <div className='p-3 w-full rounded-lg flex flex-col gap-5 bg-gray100'>
          <div className='w-full rounded-lg flex justify-between'>
            <h2 className='text-sm lg:text-lg'>Personal info</h2>
            <Buttons
              label='Edit'
              className='rounded-sm text-[7px]'
              onClick={() => {}}
            />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <h2 className='text-[10px] lg:text-sm font-extralight'>
                Full name
              </h2>
              <input
                {...register('fullName')}
                type='text'
                className='text-sm bg-white p-2 border border-gray-300 rounded w-full'
                placeholder='Full Name'
                disabled={loading || isLoading}
              />
              {errors.fullName && (
                <p className='text-red-500 text-xs'>
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <h2 className='text-[10px] lg:text-sm font-extralight'>
                Company name
              </h2>
              <input
                {...register('company_name')}
                type='text'
                className='text-sm bg-white p-2 border border-gray-300 rounded w-full'
                placeholder='Company Name'
                disabled={loading || isLoading}
              />
              {errors.company_name && (
                <p className='text-red-500 text-xs'>
                  {errors.company_name.message}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* location */}
        <div className='p-3 w-full rounded-lg flex flex-col gap-5 bg-gray100'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div className='flex flex-col gap-2'>
              <h2 className='text-[10px] lg:text-sm font-extralight'>
                Location
              </h2>
              <input
                {...register('location')}
                type='text'
                className='text-sm bg-white p-2 border border-gray-300 rounded w-full'
                placeholder='Location'
                disabled={loading || isLoading}
              />
              {errors.location && (
                <p className='text-red-500 text-xs'>
                  {errors.location.message}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <h2 className='text-[10px] lg:text-sm font-extralight'>
                Instagram handle
              </h2>
              <input
                {...register('instagram')}
                type='url'
                className='text-sm bg-white p-2 border border-gray-300 rounded w-full'
                placeholder='Instagram URL'
                disabled={loading || isLoading}
              />
              {errors.instagram && (
                <p className='text-red-500 text-xs'>
                  {errors.instagram.message}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <h2 className='text-[10px] lg:text-sm font-extralight'>
                Linkedin handle
              </h2>
              <input
                {...register('linkedin')}
                type='url'
                className='text-sm bg-white p-2 border border-gray-300 rounded w-full'
                placeholder='LinkedIn URL'
                disabled={loading || isLoading}
              />
              {errors.linkedin && (
                <p className='text-red-500 text-xs'>
                  {errors.linkedin.message}
                </p>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <h2 className='text-[10px] lg:text-sm font-extralight'>
              Website link
            </h2>
            <input
              {...register('website')}
              type='url'
              className='text-sm bg-white p-2 border border-gray-300 rounded w-full'
              placeholder='Website URL'
              disabled={loading || isLoading}
            />
            {errors.website && (
              <p className='text-red-500 text-xs'>{errors.website.message}</p>
            )}
          </div>
        </div>
        {/* about us */}
        <div className='p-3 w-full rounded-lg flex flex-col gap-5 bg-gray100'>
          <h2>About Us</h2>
          <textarea
            {...register('about_us')}
            maxLength={1000}
            className='resize-none min-h-60 w-full p-2 border border-primary rounded outline-none focus:ring-0 focus:outline-none'
            placeholder='Tell us about your company (1000 characters max)'
            disabled={loading || isLoading}
          />
          {errors.about_us && (
            <p className='text-red-500 text-xs'>{errors.about_us.message}</p>
          )}
        </div>
        <div className='flex flex-col items-end gap-2'>
          {errorMessage && (
            <p className='text-red-500 text-xs'>{errorMessage}</p>
          )}
          <Buttons
            type='submit'
            label={isLoading ? 'Saving...' : 'Save changes'}
            className='!bg-primary w-fit text-white self-end rounded-sm font-raleway'
          />
        </div>
      </div>
    </form>
  )
}

export default RecruiterEditProfile
