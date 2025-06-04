'use client'

import { CreatorAuth } from '@/src/lib/requests/auth.new'
import { useAppSelector } from '@/src/redux/hooks'
import { ResumeInfo } from '@/types/user'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const ResumeUpdatePage = () => {
  const { profile } = useAppSelector((state) => state.user)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<ResumeInfo>({
    defaultValues: {
      brief: '',
      full_name: '',
      email: '',
      phone_number: '',
      industry: '',
      location: '',
      category: '',
      job_title: '',
      education: [{ course: '', school: '', started: '', ended: '' }],
      links: {
        linkedin: '',
        twitter: '',
        instagram: '',
        tiktok: '',
      },
      skills: [{ value: '' }],
      experience: [
        { location: '', job_title: '', contribution: '', ended: '' },
      ],
      other_skills: [{ value: '' }],
      certifications: [{ value: '' }],
    },
    mode: 'onChange',
  })

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray<ResumeInfo, 'education', 'id'>({
    control,
    name: 'education',
  })

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray<ResumeInfo, 'experience', 'id'>({
    control,
    name: 'experience',
  })

  const {
    fields: skillsFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: 'skills',
  })

  const {
    fields: otherSkillsFields,
    append: appendOtherSkill,
    remove: removeOtherSkill,
  } = useFieldArray({
    control,
    name: 'other_skills',
  })

  const {
    fields: certificationsFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray({
    control,
    name: 'certifications',
  })

  useEffect(() => {
    if (profile) {
      setValue('brief', profile.resume.brief || '')
      setValue(
        'full_name',
        profile.bio_data?.full_name || profile.resume.full_name || ''
      )
      setValue('email', profile.resume.email || '')
      setValue('phone_number', profile.resume.phone_number || '')
      setValue('industry', profile.resume.industry || '')
      setValue('location', profile.resume.location || '')
      setValue('category', profile.resume.category || '')
      setValue('job_title', profile.resume.job_title || '')

      // Format education dates
      const formattedEducation = (
        profile.resume.education || [
          { course: '', school: '', started: '', ended: '' },
        ]
      ).map((edu) => ({
        ...edu,
        started: edu.started
          ? new Date(edu.started).toISOString().split('T')[0]
          : '',
        ended: edu.ended ? new Date(edu.ended).toISOString().split('T')[0] : '',
      }))
      setValue('education', formattedEducation)

      setValue('links.linkedin', profile.resume.links?.linkedin || '')
      setValue('links.twitter', profile.resume.links?.twitter || '')
      setValue('links.instagram', profile.resume.links?.instagram || '')
      setValue('links.tiktok', profile.resume.links?.tiktok || '')
      setValue(
        'skills',
        profile.resume.skills?.map((skill) => ({ value: skill })) || [
          { value: '' },
        ]
      )
      setValue(
        'other_skills',
        profile.resume.other_skills?.map((skill) => ({ value: skill })) || [
          { value: '' },
        ]
      )
      setValue(
        'certifications',
        profile.resume.certifications?.map((cert) => ({ value: cert })) || [
          { value: '' },
        ]
      )

      // Format experience dates
      const formattedExperience = (
        profile.resume.experience || [
          { location: '', job_title: '', contribution: '', ended: '' },
        ]
      ).map((exp) => ({
        ...exp,
        ended: exp.ended ? new Date(exp.ended).toISOString().split('T')[0] : '',
      }))
      setValue('experience', formattedExperience)
    }
  }, [profile, setValue])

  const onSubmit = async (data: ResumeInfo) => {
    setErrorMessage(null)
    const transformedData = {
      resume_info: {
        ...data,
        skills: data.skills.map((skill) => skill.value),
        other_skills: data.other_skills.map((skill) => skill.value),
        certifications: data.certifications.map((cert) => cert.value),
        phone_number: data.phone_number,
        industry: data.industry,
        location: data.location,
        category: data.category,
        job_title: data.job_title,
      },
    }


    try {
      const response = await CreatorAuth.updateResume(transformedData, 'RESUME')

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
      toast.error(errorMsg)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-2xl mx-auto p-4 bg-gray-100 min-h-screen'
    >
      {/* Personal Info Section */}
      <div className='bg-[#1E3A8A] text-white p-4 mb-4 rounded-lg'>
        <h2 className='text-lg font-semibold'>Personal Info</h2>
      </div>
      <div className='space-y-4 mb-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Full Name
          </label>
          <input
            {...register('full_name', { required: 'Full Name is required' })}
            className='w-full p-2 border border-gray-300 rounded-md'
            placeholder='Full Name'
          />
          {errors.full_name && (
            <p className='text-red-500 text-sm'>{errors.full_name.message}</p>
          )}
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <input
            {...register('email')}
            type='email'
            className='w-full p-2 border border-gray-300 rounded-md'
            placeholder='Email'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Phone Number
          </label>
          <input
            {...register('phone_number')}
            type='text'
            className='w-full p-2 border border-gray-300 rounded-md'
            placeholder='Phone Number'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Industry
          </label>
          <input
            {...register('industry', { required: 'Industry is required' })}
            className='w-full p-2 border border-gray-300 rounded-md'
            placeholder='Industry'
          />
          {errors.industry && (
            <p className='text-red-500 text-sm'>{errors.industry.message}</p>
          )}
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Location
          </label>
          <input
            {...register('location', { required: 'Location is required' })}
            className='w-full p-2 border border-gray-300 rounded-md'
            placeholder='Location'
          />
          {errors.location && (
            <p className='text-red-500 text-sm'>{errors.location.message}</p>
          )}
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Category
          </label>
          <input
            {...register('category', { required: 'Category is required' })}
            className='w-full p-2 border border-gray-300 rounded-md'
            placeholder='Category'
          />
          {errors.category && (
            <p className='text-red-500 text-sm'>{errors.category.message}</p>
          )}
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Job Title
          </label>
          <input
            {...register('job_title', { required: 'Job Title is required' })}
            className='w-full p-2 border border-gray-300 rounded-md'
            placeholder='Job Title'
          />
          {errors.job_title && (
            <p className='text-red-500 text-sm'>{errors.job_title.message}</p>
          )}
        </div>
      </div>

      {/* Education Section */}
      <div className='bg-[#1E3A8A] text-white p-4 mb-4 rounded-lg'>
        <h2 className='text-lg font-semibold'>Education</h2>
      </div>
      {educationFields.map((field, index) => (
        <div key={field.id} className='space-y-4 mb-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Course
            </label>
            <input
              {...register(`education.${index}.course`)}
              className='w-full p-2 border border-gray-300 rounded-md'
              placeholder='Course'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              School
            </label>
            <input
              {...register(`education.${index}.school`)}
              className='w-full p-2 border border-gray-300 rounded-md'
              placeholder='School'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Started
            </label>
            <input
              {...register(`education.${index}.started`)}
              type='date'
              className='w-full p-2 border border-gray-300 rounded-md'
              placeholder='Started'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Ended
            </label>
            <input
              {...register(`education.${index}.ended`)}
              type='date'
              className='w-full p-2 border border-gray-300 rounded-md'
              placeholder='Ended'
            />
          </div>
          {educationFields.length > 1 && (
            <button
              type='button'
              onClick={() => removeEducation(index)}
              className='text-red-500 hover:text-red-700'
            >
              Remove Education
            </button>
          )}
        </div>
      ))}
      <button
        type='button'
        onClick={() =>
          appendEducation({ course: '', school: '', started: '', ended: '' })
        }
        className='text-blue-500 hover:text-blue-700 mb-6'
      >
        Add Education
      </button>

      {/* Professional Brief Section */}
      <div className='bg-[#1E3A8A] text-white p-4 mb-4 rounded-lg'>
        <h2 className='text-lg font-semibold'>Professional Brief</h2>
      </div>
      <div className='mb-6'>
        <textarea
          {...register('brief')}
          className='w-full p-2 border border-gray-300 rounded-md h-24'
          placeholder='Write your professional brief here...'
        ></textarea>
      </div>

      {/* Work Experience Section */}
      <div className='bg-[#1E3A8A] text-white p-4 mb-4 rounded-lg'>
        <h2 className='text-lg font-semibold'>
          Work Experience (3 Jobs allowed)
        </h2>
      </div>
      {experienceFields.map((field, index) => (
        <div key={field.id} className='space-y-4 mb-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Job Title
            </label>
            <input
              {...register(`experience.${index}.job_title`)}
              className='w-full p-2 border border-gray-300 rounded-md'
              placeholder='Job Title'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Location
            </label>
            <input
              {...register(`experience.${index}.location`)}
              className='w-full p-2 border border-gray-300 rounded-md'
              placeholder='Location'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              How did you help/What did you do
            </label>
            <input
              {...register(`experience.${index}.contribution`)}
              className='w-full p-2 border border-gray-300 rounded-md'
              placeholder='How did you help/What did you do'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Ended
            </label>
            <input
              {...register(`experience.${index}.ended`)}
              type='date'
              className='w-full p-2 border border-gray-300 rounded-md'
              placeholder='Ended'
            />
          </div>
          {experienceFields.length > 1 && (
            <button
              type='button'
              onClick={() => removeExperience(index)}
              className='text-red-500 hover:text-red-700'
            >
              Remove Experience
            </button>
          )}
        </div>
      ))}
      {experienceFields.length < 3 && (
        <button
          type='button'
          onClick={() =>
            appendExperience({
              location: '',
              job_title: '',
              contribution: '',
              ended: '',
            })
          }
          className='mb-6 text-blue-500 hover:text-blue-700'
        >
          Add Experience
        </button>
      )}

      {/* Job Skills Section */}
      <div className='bg-[#1E3A8A] text-white p-4 mb-4 rounded-lg'>
        <h2 className='text-lg font-semibold'>Job Skills</h2>
      </div>
      {skillsFields.map((field, index) => (
        <div key={field.id} className='space-y-4 mb-2'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Write Here
            </label>
            <input
              {...register(`skills.${index}.value`)}
              className='w-full p-2 border border-gray-300 rounded-md'
              placeholder='Write Here'
            />
          </div>
          {skillsFields.length > 1 && (
            <button
              type='button'
              onClick={() => removeSkill(index)}
              className='text-red-500 hover:text-red-700'
            >
              Remove Skill
            </button>
          )}
        </div>
      ))}
      <button
        type='button'
        onClick={() => appendSkill({ value: '' })}
        className='text-blue-500 hover:text-blue-700 mb-6'
      >
        Add Skill
      </button>

      {/* Other Skills Section */}
      <div className='bg-[#1E3A8A] text-white p-4 mb-4 rounded-lg'>
        <h2 className='text-lg font-semibold'>Other Skills</h2>
      </div>
      {otherSkillsFields.map((field, index) => (
        <div key={field.id} className='space-y-4 mb-2'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Write Here
            </label>
            <input
              {...register(`other_skills.${index}.value`)}
              className='w-full p-2 border border-gray-300 rounded-md'
              placeholder='Write Here'
            />
          </div>
          {otherSkillsFields.length > 1 && (
            <button
              type='button'
              onClick={() => removeOtherSkill(index)}
              className='text-red-500 hover:text-red-700'
            >
              Remove Other Skill
            </button>
          )}
        </div>
      ))}
      <button
        type='button'
        onClick={() => appendOtherSkill({ value: '' })}
        className='text-blue-500 hover:text-blue-700 mb-6'
      >
        Add Other Skill
      </button>

      {/* Certifications Section */}
      <div className='bg-[#1E3A8A] text-white p-4 mb-4 rounded-lg'>
        <h2 className='text-lg font-semibold'>Certifications</h2>
      </div>
      {certificationsFields.map((field, index) => (
        <div key={field.id} className='space-y-4 mb-2'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Certification
            </label>
            <input
              {...register(`certifications.${index}.value`)}
              className='w-full p-2 border border-gray-300 rounded-md'
              placeholder='Certification'
            />
          </div>
          {certificationsFields.length > 1 && (
            <button
              type='button'
              onClick={() => removeCertification(index)}
              className='text-red-500 hover:text-red-700'
            >
              Remove Certification
            </button>
          )}
        </div>
      ))}
      <button
        type='button'
        onClick={() => appendCertification({ value: '' })}
        className='text-blue-500 hover:text-blue-700 mb-6'
      >
        Add Certification
      </button>

      {/* Social Media Section */}
      <div className='bg-[#1E3A8A] text-white p-4 mb-4 rounded-lg'>
        <h2 className='text-lg font-semibold'>Social Media</h2>
      </div>
      <div className='space-y-4 mb-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Instagram
          </label>
          <input
            {...register('links.instagram')}
            className='w-full p-2 border border-gray-300 rounded-md'
            placeholder='Instagram'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            LinkedIn
          </label>
          <input
            {...register('links.linkedin')}
            className='w-full p-2 border border-gray-300 rounded-md'
            placeholder='LinkedIn'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Twitter
          </label>
          <input
            {...register('links.twitter')}
            className='w-full p-2 border border-gray-300 rounded-md'
            placeholder='Twitter'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            TikTok
          </label>
          <input
            {...register('links.tiktok')}
            className='w-full p-2 border border-gray-300 rounded-md'
            placeholder='TikTok'
          />
        </div>
      </div>

      {/* Error Message and Submit Button */}
      <div className='flex flex-col items-end'>
        {errorMessage && (
          <p className='text-red-500 text-sm mb-2'>{errorMessage}</p>
        )}
        <button
          type='submit'
          className='bg-[#1E3A8A] text-white px-6 py-2 rounded-md hover:bg-[#2B4EBA] transition'
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default ResumeUpdatePage
