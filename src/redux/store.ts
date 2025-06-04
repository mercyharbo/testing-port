import jobsReducer from '@/src/redux/features/jobs/jobSlice'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import recruiter from './features/user/recruiterSlice'
import userReducer from './features/user/userSlice'
import recruiterReducer from '@/src/redux/features/jobs/GetCreatorsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    recruiter: recruiter,
    jobs: jobsReducer,
    recruiterJobs: recruiterReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
