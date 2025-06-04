'use client'

import { CreatorAuth } from '@/src/lib/requests/auth.new'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { GrGoogle } from 'react-icons/gr'
import * as Yup from 'yup'
import AppButton from '../ui/Button'
import LabelInput from '../ui/LabelInput'

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export default function CreatorLoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string>('')

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setError('')
        const response = await CreatorAuth.login(values)
        if (response.status === 200) {
          toast.success(
            response.message || 'Login successful! Redirecting to dashboard...'
          )
          setTimeout(() => {
            router.push('/creative-homepage') // Redirect to dashboard after successful login
          }, 2500)
        } else {
          setError(response.message || 'Login failed. Please try again.')
          toast.error(response.message || 'Login failed. Please try again.')
          return
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Login failed. Please try again.'
        setError(errorMessage)
        console.error('Login error:', error)
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <main className='w-full px-5 lg:px-0 lg:w-4/5 m-auto h-screen flex flex-col justify-center items-start gap-4 lg:pt-20'>
      <div className='flex flex-col gap-3'>
        <h1 className='text-4xl font-inter font-normal'>Sign In </h1>
        <p className='text-xl font-raleway'>Welcome creatives, sign-in</p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className='w-full flex flex-col gap-5'
      >
        <div className='flex flex-col gap-1'>
          <LabelInput
            type='email'
            id='email'
            name='email'
            label='Email'
            placeholder='Enter your email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email ? formik.errors.email : undefined}
          />
        </div>

        <div className='flex flex-col gap-1'>
          <LabelInput
            type='password'
            id='password'
            name='password'
            label='Password'
            placeholder='Enter your password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password ? formik.errors.password : undefined}
          />
        </div>

        {error && (
          <div className='p-3 text-sm text-red-500 bg-red-50 rounded-md'>
            {error}
          </div>
        )}

        <div className='flex flex-col gap-5'>
          <AppButton
            type='submit'
            disabled={formik.isSubmitting}
            className='w-full'
          >
            {formik.isSubmitting ? 'Signing in...' : 'Sign in'}
          </AppButton>
          <div className='flex items-center my-6'>
            <div className='flex-grow h-px bg-gray-300'></div>
            <span className='mx-2 text-gray-500 text-sm'>or</span>
            <div className='flex-grow h-px bg-gray-300'></div>
          </div>
          <AppButton
            type='button'
            variant='outline'
            className='w-full flex items-center justify-center gap-2'
            // onClick={handleGoogleSignIn}
          >
            Sign in with Google
            <GrGoogle className='text-lg' />
          </AppButton>
        </div>
      </form>

      <p className='text-sm text-white text-center mx-auto flex justify-center items-center gap-3'>
        Don&apos;t have an account?{' '}
        <a href='/sign-up' className='text-white font-semibold hover:underline'>
          Sign up
        </a>
      </p>
    </main>
  )
}
