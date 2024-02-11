import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "@/utils/BaseURL";


// Async Thunks

export const fetchUser = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async (token, { getState }) => {
    try {
      const tokenF = getState().auth.token;
      
      const response = await axios.get(`${baseURL}/profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("Response: ", response.data);
      if(response.status === 200) return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Slice
const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    loading: false,
    userProfile: null,
    isError: false,
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    userProfileAdded(state, action) {
      state.userProfile.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
        state.isError = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.isError = true;
      });
     
  },
});

export default userProfileSlice.reducer;
