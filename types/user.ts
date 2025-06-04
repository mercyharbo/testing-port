export type Education = {
  course: string
  school: string
  started: string // ISO date string
  ended: string // ISO date string
}

export type Experience = {
  location: string
  job_title: string
  contribution: string
  ended: string // ISO date string
}

export type UserProfile = {
  auth: {
    token: {
      issued_at: string // ISO date string
    }
    validation_token: string | null
  }
  email: string
  bio_data: {
    full_name: string
    user_name: string
  }
  created_at: string // ISO date string
  id: string
  profile: {
    phone_number: string
    years_of_experience: string
    industry: string
    field: string
    location: {
      state: string
      lga: string
    }
    linkedin?: string
    twitter?: string
    instagram?: string
    tiktok?: string
  }
  profile_views: number
  rating: number
  ratings: any[] // Replace with specific type if known
  resume: {
    brief: string
    industry: string
    location: string
    category: string
    job_title: string
    full_name: string
    phone_number: string
    email: string
    links: {
      linkedin: string
      twitter: string
      instagram: string
      tiktok: string
    }
    skills: string[]
    other_skills: string[]
    certifications: string[]
    experience: Experience[]
    education: Education[]
  }
  links: {
    linkedin: number
    twitter: number
    instagram: number
    tiktok: number
  }
  updated_at: string // ISO date string
}

export type UserResponse = {
  data: UserProfile
  message: string
}

export type ProfileUpdateFormData = {
  profile: {
    phone_number: string
    location: {
      state: string
      lga: string
    }
    industry: string
    field: string
    years_of_experience: string
    social_links: {
      linkedin: string
      twitter: string
      instagram: string
      tiktok: string
    }
  }
}

export interface ResumeInfo {
  brief: string
  full_name: string
  email: string
  phone_number: string
  industry: string
  location: string
  category: string
  job_title: string
  education: Array<{
    course: string
    school: string
    started: string
    ended: string
  }>
  links: {
    linkedin: string
    twitter: string
    instagram: string
    tiktok: string
  }
  skills: Array<{
    value: string
  }>
  experience: Array<{
    location: string
    job_title: string
    contribution: string
    ended: string
  }>
  other_skills: Array<{
    value: string
  }>
  certifications: Array<{
    value: string
  }>
}

export interface ResumePayload {
  resume_info: {
    brief: string
    full_name: string
    email: string
    phone_number: string
    industry: string
    location: string
    category: string
    job_title: string
    education: {
      course: string
      school: string
      started: string
      ended: string
    }[]
    links: {
      linkedin: string
      twitter: string
      instagram: string
      tiktok: string
    }
    skills: string[]
    other_skills: string[]
    certifications: string[]
    experience: {
      location: string
      job_title: string
      contribution: string
      ended: string
    }[]
  }
}
export type PasswordChangeType = {
  old_password: string
  new_password: string
}
