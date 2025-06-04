'use client'

import { CreatorAuth } from '@/src/lib/requests/auth.new'
import {
  setError,
  setLgas,
  setLoading,
  setSelectedField,
  setSelectedState,
} from '@/src/redux/features/authSlice'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { Field, industryOptions } from '@/src/utils/industryData'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import LabelInput from '../ui/LabelInput'
import LabelSelect from '../ui/LabelSelect'

// Nigerian states data
export const nigerianStates = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
]

const experienceOptions = [
  { label: 'Beginner (0-1 years)', value: '1 years' },
  { label: 'Intermediate (2 years)', value: '2 years' },
  { label: 'Mid-level (3 years)', value: '3 years' },
  { label: 'Professional (4-6 years)', value: '4 years' },
  { label: 'Expert (7-15 years)', value: '7 years' },
]

// Helper function to format phone number
const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove any non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '')
  // Format as Nigerian phone number if it starts with 0 or 234
  if (cleaned.startsWith('0')) {
    return cleaned // Keep the format as is for now
  } else if (cleaned.startsWith('234')) {
    return cleaned // Keep the international format
  } else if (cleaned.length <= 10) {
    return `0${cleaned}` // Add leading 0 for local numbers
  }
  return cleaned
}

const validationSchema = Yup.object({
  full_name: Yup.string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .matches(
      /^[a-zA-Z\s-]+$/,
      'Full name can only contain letters, spaces, and hyphens'
    ),
  user_name: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be at most 30 characters')
    .matches(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, underscores and dashes'
    )
    .transform((value) => value?.toLowerCase()),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .transform((value) => value?.toLowerCase()),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(
      /^([0]|[234])[0-9]{10}$/,
      'Please enter a valid Nigerian phone number'
    ),
  field: Yup.string().required('Field is required'),
  industry: Yup.string().required('Industry is required'),
  years_of_experience: Yup.string().required('Experience level is required'),
  state: Yup.string().required('State is required'),
  lga: Yup.string().required('LGA is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    ),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  acceptedTerms: Yup.boolean()
    .required('You must accept the terms')
    .oneOf([true], 'You must accept the terms'),
})

export default function CreativeSignupForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    selectedField,
    selectedState,
    lgas,
    loading: loadingLgas,
  } = useAppSelector((state) => state.auth)

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

  // Transform data for select components
  const stateOptions = nigerianStates.map((state) => ({
    label: state,
    value: state,
  }))

  const lgaOptions = lgas.map((lga) => ({
    label: lga,
    value: lga,
  }))

  const fields = Object.keys(industryOptions).map((field) => ({
    label: field,
    value: field,
  })) as { label: string; value: Field }[]

  const industries = selectedField
    ? industryOptions[selectedField as Field].map((industry: string) => ({
        label: industry,
        value: industry,
      }))
    : []
  const experienceOptionsList = experienceOptions

  const formik = useFormik({
    initialValues: {
      full_name: '',
      user_name: '',
      email: '',
      phoneNumber: '',
      field: '',
      industry: '',
      years_of_experience: '',
      state: '',
      lga: '',
      password: '',
      confirmPassword: '',
      acceptedTerms: false,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitError(null)
        const formattedPhone = formatPhoneNumber(values.phoneNumber)

        const registrationData = {
          full_name: values.full_name.trim(),
          user_name: values.user_name.toLowerCase().trim(),
          email: values.email.toLowerCase().trim(),
          phone_number: formattedPhone,
          password: values.password,
          field: values.field,
          industry: values.industry,
          years_of_experience: values.years_of_experience,
          state: values.state,
          lga: values.lga,
        }

        const response = await CreatorAuth.register(registrationData)

        if (response.status === 201) {
          // localStorage.setItem('userEmail', registrationData.email)
          toast.success(response.message || 'Registration successful!')
          setTimeout(() => {
            router.push('/creative-email')
          }, 2500)
        } else if (response.status === 201) {
          toast.error(response.message || 'Registration failed')
          throw new Error(response.message || 'Registration failed')
          return
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Registration failed. Please try again.'
        setSubmitError(errorMessage)
        console.error('Registration error:', error)
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <main className='flex flex-col justify-start items-center gap-5 max-w-7xl'>
      <div className='w-full lg:w-4/5 flex flex-col gap-10 py-20'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-4xl font-inter font-normal'>Sign up</h1>
          <p className='text-xl font-raleway'>Welcome Creatives, sign up</p>
        </div>

        <div className='w-full flex flex-col gap-5'>
          <h3 className='text-2xl'>Basic Information</h3>

          {submitError && (
            <div className='p-3 text-sm text-red-500 bg-red-50 rounded-md'>
              {submitError}
            </div>
          )}

          <form
            onSubmit={formik.handleSubmit}
            className='flex flex-col gap-10 w-full'
          >
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-5 gap-10 w-full'>
              <LabelInput
                label='full name'
                id='full_name'
                name='full_name'
                type='text'
                placeholder='Enter your full name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.full_name}
                error={
                  formik.touched.full_name ? formik.errors.full_name : undefined
                }
                required
              />

              <LabelInput
                label='username'
                id='user_name'
                name='user_name'
                type='text'
                placeholder='Enter your username'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.user_name}
                error={
                  formik.touched.user_name ? formik.errors.user_name : undefined
                }
                required
              />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-5 gap-10 w-full'>
              <LabelInput
                label='email address'
                id='email'
                name='email'
                type='email'
                placeholder='Enter your email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email ? formik.errors.email : undefined}
                required
              />

              <LabelInput
                label='phone number'
                id='phoneNumber'
                name='phoneNumber'
                type='tel'
                placeholder='e.g. 08012345678'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                error={
                  formik.touched.phoneNumber
                    ? formik.errors.phoneNumber
                    : undefined
                }
                required
              />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-5 gap-10 w-full'>
              <LabelSelect
                label='Field'
                id='field'
                name='field'
                options={fields}
                value={formik.values.field}
                onChange={(e) => {
                  formik.setFieldValue('field', e.target.value)
                  dispatch(setSelectedField(e.target.value))
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.field ? formik.errors.field : undefined}
              />

              <LabelSelect
                label='Industry'
                id='industry'
                name='industry'
                options={industries}
                value={formik.values.industry}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.industry ? formik.errors.industry : undefined
                }
              />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-5 gap-10 w-full'>
              <LabelSelect
                label='Experience Level'
                id='years_of_experience'
                name='years_of_experience'
                options={experienceOptionsList}
                value={formik.values.years_of_experience}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.years_of_experience
                    ? formik.errors.years_of_experience
                    : undefined
                }
              />

              <LabelSelect
                label='State'
                id='state'
                name='state'
                options={stateOptions}
                value={formik.values.state}
                onChange={(e) => {
                  formik.setFieldValue('state', e.target.value)
                  dispatch(setSelectedState(e.target.value))
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.state ? formik.errors.state : undefined}
              />
            </div>

            <div className='w-full'>
              <LabelSelect
                label='LGA'
                name='lga'
                id='lga'
                options={lgaOptions}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lga}
                error={formik.touched.lga ? formik.errors.lga : undefined}
                required
                loading={loadingLgas}
              />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-5 gap-10 w-full'>
              <LabelInput
                label='Password'
                id='password'
                name='password'
                type='password'
                placeholder='Enter a strong password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={
                  formik.touched.password ? formik.errors.password : undefined
                }
                required
              />

              <LabelInput
                label='Confirm Password'
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                placeholder='Re-enter password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                error={
                  formik.touched.confirmPassword
                    ? formik.errors.confirmPassword
                    : undefined
                }
                required
              />
            </div>

            <div className='flex items-center gap-3'>
              <input
                type='checkbox'
                id='acceptedTerms'
                name='acceptedTerms'
                onChange={formik.handleChange}
                checked={formik.values.acceptedTerms}
                className='w-5 h-5 text-green-600 border-gray-300 rounded'
              />
              <label htmlFor='acceptedTerms' className='text-sm'>
                I agree to the terms and conditions
              </label>
            </div>
            {formik.touched.acceptedTerms && formik.errors.acceptedTerms && (
              <p className='text-sm text-red-500'>
                {formik.errors.acceptedTerms}
              </p>
            )}

            <button
              type='submit'
              disabled={formik.isSubmitting || !formik.isValid}
              className='border border-gray-400 text-white py-3 px-6 rounded-lg hover:bg-white hover:text-black 
              transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {formik.isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
