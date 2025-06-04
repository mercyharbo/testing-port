import { AuthStorage, RecruiterAuth } from '@/src/lib/requests/auth.new'
import { RecruiterProfile } from '@/types/recruiter'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Define the initial state
interface RecruiterState {
  recruiterProfile: RecruiterProfile | null
  loading: boolean
  error: string | null
}

const initialState: RecruiterState = {
  recruiterProfile: null,
  loading: false,
  error: null,
}

export const fetchRecruiterProfile = createAsyncThunk<
  RecruiterProfile,
  void,
  { rejectValue: string }
>('recruiter/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await RecruiterAuth.getProfile()

    if (response.message === 'Success') {
      return response.data as RecruiterProfile
    }
    return rejectWithValue(response.message || 'Failed to fetch profile')
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const typedError = error as any
    if (typedError.response?.status === 401) {
      AuthStorage.clearAuth()
      window.location.href = '/login'
      return rejectWithValue('Session expired, please login again')
    }

    return rejectWithValue('An error occurred while fetching the profile')
  }
})

const recruiterSlice = createSlice({
  name: 'recruiter', // Changed to 'recruiter' to avoid confusion with user slice
  initialState,
  reducers: {
    setRecruiterProfile: (state, action: PayloadAction<RecruiterProfile>) => {
      state.recruiterProfile = action.payload
    },
    clearProfile: (state) => {
      state.recruiterProfile = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecruiterProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchRecruiterProfile.fulfilled,
        (state, action: PayloadAction<RecruiterProfile>) => {
          state.loading = false
          state.recruiterProfile = action.payload
          state.error = null
        }
      )
      .addCase(fetchRecruiterProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setRecruiterProfile, clearProfile } = recruiterSlice.actions
export default recruiterSlice.reducer
