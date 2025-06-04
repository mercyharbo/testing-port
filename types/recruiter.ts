export type RecruiterAuthData = {
  token: {
    issued_at: string
  }
  validation_token: string | null
}

export type RecruiterBioData = {
  full_name: string
}

export type RecruiterCompanyInfo = {
  company_name: string
  about_us?: string
  // Add other company info fields as needed
}

export type RecruiterProfile = {
  auth: RecruiterAuthData
  email: string
  provider: string
  bio_data: RecruiterBioData
  company_info: RecruiterCompanyInfo
  created_at: string
  id: string
  profile: Record<string, any> // Empty object for now
  rating: number
  ratings: any[] // Replace with proper type if needed
  updated_at: string
}

export type RecruiterResponse = {
  data: RecruiterProfile
  message: string
}

export interface RecruiterJobsResponse {
  status: number
  message: string
  data: {
    total_filtered_data: number
    page_count: number
    page_data: CreatorResponse[]
  }
}

export interface CreatorResponse {
  _id: string
  recruiter_id: string
  applicants: string[]
  title: string
  description: string
  experience: string
  industry: string
  salary_range: string
  deadline: string
  work_mode: string
  skills: {
    technical: string[]
    soft: string[]
    responsibilities: string[]
    requirements: string[]
    others: string
  }
  location: string
  status: string
  created_at: string
  updated_at: string
  __v: number
}

///////////// start here

export interface CreatorResponse {
  auth: {
    email: string
    provider: string
    token: {
      issued_at: string
    }
    validation_token: null
  }
  bio_data: {
    full_name: string
  }
  company_info: {
    about_us: string
    company_name: string
  }
  created_at: string
  id: string
  profile: {}
  rating: number
  ratings: any[]
  updated_at: string
}

export interface RecruiterProfilePayload {
  profile: {
    full_name: string
    location: string
    company_name: string
    instagram?: string
    linkedin?: string
    website?: string
    about_us: string
  }
}
