import { AuthStorage, CreatorAuth } from '@/src/lib/requests/auth.new'
import { UserProfile } from '@/types/user'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Define the initial state
interface UserState {
  profile: UserProfile | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
}

/* The `export const fetchUserProfile` is creating an asynchronous thunk using the `createAsyncThunk`
function from Redux Toolkit. This thunk is responsible for fetching the user profile data based on
the user type (creator or recruiter) and handling various scenarios such as success, error, and
session expiration. */
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      // const userType = AuthStorage.getUserType()

      // if (!userType) {
      //   return rejectWithValue('No user type found')
      // }
      const response = await CreatorAuth.getProfile()

      if (response.message === 'Success') {
        return response.data
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

      console.error('Error fetching profile:', typedError)
      return rejectWithValue('An error occurred while fetching the profile')
    }
  }
)

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload
    },
    clearProfile: (state) => {
      state.profile = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
        state.error = null
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

// Export actions and reducer
export const { setProfile, clearProfile } = userSlice.actions
export default userSlice.reducer
