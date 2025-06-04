import apiClient from '@/service/apiClient'
import { Job, JobResponse } from '@/types/jobs' // Update types to include JobDetailResponse
import { AxiosError } from 'axios'
import { handleApiError } from './auth.new'
import { RecruiterJobsResponse } from '@/types/recruiter'

const ENDPOINTS = {
  CREATOR: {
    GET_JOBS: '/job/creator-get-jobs?creatorJob=yes',
    APPLY_JOB: 'job/apply?job_id=',
    GET_JOB_DETAILS: '/job/details?job_id=', // New endpoint for job details
  },
  RECRUITER: {
    GET_CREATORS: '/job/get',
    REMOVE_JOB: '/job/remove?job_id=',
    CLOSE_JOB: '/job/close?job_id=',
    CREATE_JOB: '/job/create',
  },
}

interface ErrorResponse {
  message?: string
  error?: string
  status?: number // Add status to ErrorResponse
}

// Assuming JobDetailResponse is a more detailed version of JobResponse
export const CreatorJobs = {
  getJobs: async (): Promise<JobResponse> => {
    try {
      const res = await apiClient.get(ENDPOINTS.CREATOR.GET_JOBS)

      return res.data
    } catch (error) {
      throw handleApiError(error as AxiosError<ErrorResponse>)
    }
  },

  getJobDetails: async (jobId: string): Promise<Job> => {
    try {
      const res = await apiClient.get(
        `${ENDPOINTS.CREATOR.GET_JOB_DETAILS}${jobId}`
      )

      return res.data
    } catch (error) {
      throw handleApiError(error as AxiosError<ErrorResponse>)
    }
  },
}

export const RecruiterJobs = {
  getCreators: async (): Promise<RecruiterJobsResponse> => {
    try {
      const res = await apiClient.get(ENDPOINTS.RECRUITER.GET_CREATORS)

      return res.data
    } catch (error) {
      throw handleApiError(error as AxiosError<ErrorResponse>)
    }
  },
}
