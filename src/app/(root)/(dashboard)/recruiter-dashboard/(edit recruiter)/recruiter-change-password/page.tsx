'use client'

import { Buttons } from '@/src/components/export_components'
import { RecruiterAuth } from '@/src/lib/requests/auth.new'
import { useAppSelector } from '@/src/redux/hooks'
import { LooadingSpinner } from '@/src/utils/util_component'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

const formSchema = z
  .object({
    oldPassword: z.string().min(1, 'Old password is required'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters')
      .regex(
        /[A-Za-z0-9!@#$%^&*]/,
        'Password must contain letters, numbers, or special characters'
      ),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof formSchema>

const ChangePassword = () => {
  const { loading } = useAppSelector((state) => state.recruiter)
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
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    reset({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  }, [reset])

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setErrorMessage(null)

    const payload = {
      old_password: data.oldPassword,
      new_password: data.newPassword,
    }

    try {
      const res = await RecruiterAuth.changePassword(payload)

      if (res.status === 200) {
        toast.success(res.message)
        setTimeout(() => {
          window.location.reload()
        }, 2500)
      } else {
        const errorMsg = res.message || 'Failed to update password'
        setErrorMessage(errorMsg)
        toast.error(errorMsg)
      }
    } catch (error) {
      const errorMsg =
        (error as Error).message ||
        'An error occurred while updating the password'
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
    <div className='flex h-screen'>
      <div className='w-4/5 p-6 bg-gray-100 flex flex-col items-center'>
        <h2 className='text-2xl font-bold text-primary mb-6'>Password Reset</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-4 w-full max-w-md'
        >
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-light'>Old Password</label>
            <input
              {...register('oldPassword')}
              type='password'
              className='p-2 border border-gray-300 rounded bg-gray-200 w-full'
              placeholder='Enter your old password'
              disabled={loading || isLoading}
            />
            {errors.oldPassword && (
              <p className='text-red-500 text-xs'>
                {errors.oldPassword.message}
              </p>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-light'>New Password</label>
            <input
              {...register('newPassword')}
              type='password'
              className='p-2 border border-gray-300 rounded bg-gray-200 w-full'
              placeholder='Enter your new password'
              disabled={loading || isLoading}
            />
            {errors.newPassword && (
              <p className='text-red-500 text-xs'>
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-light'>Confirm New Password</label>
            <input
              {...register('confirmPassword')}
              type='password'
              className='p-2 border border-gray-300 rounded bg-gray-200 w-full'
              placeholder='Confirm your new password'
              disabled={loading || isLoading}
            />
            {errors.confirmPassword && (
              <p className='text-red-500 text-xs'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className='flex justify-center mt-4'>
            <Buttons
              type='submit'
              label={isLoading ? 'Saving...' : 'Change my password'}
              className='bg-primary text-black py-2 px-4 rounded'
            />
          </div>
          {errorMessage && (
            <p className='text-red-500 text-xs text-center'>{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
