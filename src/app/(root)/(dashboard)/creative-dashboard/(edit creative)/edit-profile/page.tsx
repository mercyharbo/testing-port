'use client'

import { nigerianStates } from '@/src/components/creativesSignupFlow/CreatorSignupForm'
import { Buttons } from '@/src/components/export_components'
import { CreatorAuth } from '@/src/lib/requests/auth.new'
import { setError, setLgas, setLoading } from '@/src/redux/features/authSlice'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { industryOptions } from '@/src/utils/industryData'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

// Define the form schema
const formSchema = z.object({
  phone: z.string().optional(),
  state: z.string().optional(),
  lga: z.string().optional(),
  industry: z.string().optional(),
  field: z.string().optional(),
  years_of_experience: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

// Define Field type to match industryOptions keys
type FieldType = keyof typeof industryOptions

const CreatorProfilePage = () => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [selectedState, setSelectedState] = useState('')
  const [selectedField, setSelectedField] = useState<FieldType | ''>('')
  const [formData, setFormData] = useState<FormData>({
    phone: '',
    state: '',
    lga: '',
    industry: '',
    field: '',
    years_of_experience: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    tiktok: '',
  })
  const { profile } = useAppSelector((state) => state.user)
  const { lgas, loading, error } = useAppSelector((state) => state.auth)

  const { register, handleSubmit, reset, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: profile?.profile?.phone_number || '',
      state: profile?.profile?.location?.state || '',
      lga: profile?.profile?.location?.lga || '',
      industry: profile?.profile?.industry || '',
      field: profile?.profile?.field || '',
      years_of_experience: profile?.profile?.years_of_experience || '',
      linkedin: profile?.profile?.linkedin || '',
      twitter: profile?.profile?.twitter || '',
      instagram: profile?.profile?.instagram || '',
      tiktok: profile?.profile?.tiktok || '',
    },
  })

  // Initialize formData and selectedState/selectedField with server data
  useEffect(() => {
    if (profile) {
      const serverField = profile.profile?.field || ''
      const serverIndustry = profile.profile?.industry || ''
      const isValidField = serverField in industryOptions
      const isValidIndustry =
        isValidField &&
        industryOptions[serverField as FieldType]?.includes(serverIndustry)

      const newFormData = {
        phone: profile.profile?.phone_number || '',
        state: profile.profile?.location?.state || '',
        lga: profile.profile?.location?.lga || '',
        industry: isValidIndustry ? serverIndustry : '',
        field: isValidField ? serverField : '',
        years_of_experience: profile.profile?.years_of_experience || '',
        linkedin: profile.profile?.linkedin || '',
        twitter: profile.profile?.twitter || '',
        instagram: profile.profile?.instagram || '',
        tiktok: profile.profile?.tiktok || '',
      }

      setFormData(newFormData)
      // Sync react-hook-form with server data
      setValue('phone', newFormData.phone)
      setValue('state', newFormData.state)
      setValue('lga', newFormData.lga)
      setValue('industry', newFormData.industry)
      setValue('field', newFormData.field)
      setValue('years_of_experience', newFormData.years_of_experience)
      setValue('linkedin', newFormData.linkedin)
      setValue('twitter', newFormData.twitter)
      setValue('instagram', newFormData.instagram)
      setValue('tiktok', newFormData.tiktok)

      if (profile.profile?.location?.state) {
        setSelectedState(profile.profile.location.state)
      }
      if (isValidField) {
        setSelectedField(serverField as FieldType)
      }
    }
  }, [profile, setValue])

  // Fetch LGAs when state changes
  useEffect(() => {
    const fetchLgas = async () => {
      if (!selectedState) return

      dispatch(setLoading(true))
      dispatch(setError(null))
      dispatch(setLgas([]))

      try {
        const res = await fetch(
          `https://portgig-api.onrender.com/api/v1/states?state=${selectedState}`
        )
        const data = await res.json()
        if (data && Array.isArray(data.lgas) && data.lgas.length > 0) {
          dispatch(setLgas(data.lgas))
        } else {
          dispatch(setError('No LGAs found for this state.'))
        }
      } catch (error) {
        console.error('Failed to fetch LGAs:', error)
        dispatch(setError('Failed to load LGAs. Please try again.'))
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchLgas()
  }, [selectedState, dispatch])

  // Handle input changes and update formData state
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'state' ? { lga: '' } : {}),
      ...(name === 'field' ? { industry: '' } : {}),
    }))
    setValue(name as keyof FormData, value)
    if (name === 'state') {
      setSelectedState(value)
    }
    if (name === 'field') {
      setSelectedField(value as FieldType)
    }
  }

  const updateProfile = async (data: FormData) => {
    const updatedData = {
      profile: {
        phone_number: data.phone || '',
        location: {
          state: data.state || '',
          lga: data.lga || '',
        },
        industry: data.industry || '',
        field: data.field || '',
        years_of_experience: data.years_of_experience || '',
        social_links: {
          linkedin: data.linkedin || '',
          twitter: data.twitter || '',
          instagram: data.instagram || '',
          tiktok: data.tiktok || '',
        },
      },
    }

    try {
      const response = await CreatorAuth.updateProfile(updatedData, 'PROFILE')
      if (response.status === 200) {
        toast.success(response.message)
        setTimeout(() => {
          window.location.reload()
        }, 2500)
      } else {
        const errorMsg = response.message || 'Failed to update profile'
        setErrorMessage(errorMsg)
        toast.error(errorMsg)
      }
    } catch (error) {
      const errorMsg = (error as Error).message || 'Failed to update profile'
      setErrorMessage(errorMsg)
      throw new Error(errorMsg)
    }
  }

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      setErrorMessage(null)
      await updateProfile(formData)
      reset()
    } catch (error) {
      console.error('error', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col text-black gap-5 font-inter'
    >
      <h4 className='text-2xl font-bold'>Edit profile</h4>
      {/* Profile image */}
      <div className='w-full bg-white p-3 rounded-lg h-12-lg shadow'>
        <div className='flex items-center gap-5 px-3 py-3'>
          <div className='relative h-24 w-24 lg:h-36 lg:w-36 rounded-lg h-12-full overflow-hidden'>
            <Image
              src='/assets/creative.svg'
              alt='profile image'
              fill
              className='object-cover'
            />
          </div>
          <div className='flex flex-col gap-2 items-start'>
            <Buttons
              label='Upload New Photo'
              className='rounded-lg h-12-2xl text-sm border border-[rgba(10,23,84,0.7)] hover:border-[rgba(10,23,84,1)] transition'
              onClick={() => {}}
            />
            <input
              name='profileImage'
              type='file'
              accept='image/*'
              className='text-xs'
            />
            <p className='text-[8px]'>
              At least 800x800 px is recommended JPG or PNG
            </p>
          </div>
        </div>
      </div>

      {/* Personal info container */}
      <div className='bg-white shadow rounded-lg p-5 flex flex-col gap-5'>
        <header className='w-full flex justify-between items-center'>
          <h2 className='text-sm lg:text-lg font-bold'>Personal info</h2>
          <Buttons
            label='Edit'
            className='rounded-lg h-12-sm text-base'
            onClick={() => {}}
          />
        </header>

        <div className='flex flex-col gap-5 w-full'>
          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor='phone'>Phone Number</label>
            <input
              {...register('phone')}
              type='text'
              className='text-sm bg-white p-2 border border-gray-300 rounded-lg h-12'
              placeholder='Phone Number'
              onChange={handleInputChange}
              value={formData.phone}
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor='years_of_experience'>Years of Experience</label>
            <input
              {...register('years_of_experience')}
              type='text'
              className='text-sm bg-white p-2 border border-gray-300 rounded-lg h-12'
              placeholder='Years of Experience'
              onChange={handleInputChange}
              value={formData.years_of_experience}
            />
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 w-full'>
            <div className='flex flex-col gap-2'>
              <h2 className='font-light'>Field</h2>
              <select
                {...register('field')}
                className='text-sm bg-white p-2 border border-gray-300 rounded-lg h-12'
                onChange={handleInputChange}
                value={formData.field}
              >
                <option value=''>Select Field</option>
                {Object.keys(industryOptions).map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <h2 className='font-light'>Industry</h2>
              <select
                {...register('industry')}
                className='text-sm bg-white p-2 border border-gray-300 rounded-lg h-12'
                onChange={handleInputChange}
                value={formData.industry}
                disabled={!selectedField}
              >
                <option value=''>Select Industry</option>
                {selectedField &&
                  industryOptions[selectedField]?.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 w-full'>
            <div className='flex flex-col gap-2'>
              <h2 className='font-light'>State</h2>
              <select
                {...register('state')}
                className='text-sm bg-white p-2 border border-gray-300 rounded-lg h-12'
                onChange={handleInputChange}
                value={formData.state}
              >
                <option value=''>Select State</option>
                {nigerianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <h2 className='font-light'>LGA</h2>
              <select
                {...register('lga')}
                className='text-sm bg-white p-2 border border-gray-300 rounded-lg h-12'
                onChange={handleInputChange}
                value={formData.lga}
                disabled={!selectedState || loading || error !== null}
              >
                <option value=''>Select LGA</option>
                {lgas.map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
              {loading && (
                <p className='text-sm text-gray-500'>Loading LGAs...</p>
              )}
              {error && <p className='text-sm text-red-500'>{error}</p>}
            </div>
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor='linkedin'>LinkedIn</label>
            <input
              {...register('linkedin')}
              type='text'
              className='text-sm bg-white p-2 border border-gray-300 rounded-lg h-12'
              placeholder='LinkedIn Profile URL'
              onChange={handleInputChange}
              value={formData.linkedin}
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor='twitter'>Twitter</label>
            <input
              {...register('twitter')}
              type='text'
              className='text-sm bg-white p-2 border border-gray-300 rounded-lg h-12'
              placeholder='Twitter Profile URL'
              onChange={handleInputChange}
              value={formData.twitter}
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor='instagram'>Instagram</label>
            <input
              {...register('instagram')}
              type='text'
              className='text-sm bg-white p-2 border border-gray-300 rounded-lg h-12'
              placeholder='Instagram Profile URL'
              onChange={handleInputChange}
              value={formData.instagram}
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor='tiktok'>TikTok</label>
            <input
              {...register('tiktok')}
              type='text'
              className='text-sm bg-white p-2 border border-gray-300 rounded-lg h-12'
              placeholder='TikTok Profile URL'
              onChange={handleInputChange}
              value={formData.tiktok}
            />
          </div>
          <div className='flex flex-col items-end'>
            {errorMessage && (
              <p className='text-sm text-red-500 mb-2'>{errorMessage}</p>
            )}
            <Buttons
              type='submit'
              label={isLoading ? 'Saving...' : 'Save changes'}
              className='!bg-primary w-fit text-white self-end rounded-lg h-12-sm font-raleway font-semibold'
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default CreatorProfilePage
