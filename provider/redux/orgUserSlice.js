import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "@/utils/BaseURL";
const { rejectWithValue } = require("@reduxjs/toolkit");
const fetchOrgUsers = createAsyncThunk(
  "orgUsers/fetchUsers",
  async ({ orgId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseURL}/organization/${orgId}/users/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("orguser", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const orgUserSlice = createSlice({
  name: "orgUsers",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrgUsers.fulfilled, (state, action) => {
        state.orgUsers = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrgUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export { fetchOrgUsers };
export default orgUserSlice.reducer;
