import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "@/utils/BaseURL";

const fetchOrgDetails = createAsyncThunk(
  "orgDetails/fetch",
  async (orgId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/organization/${orgId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);




const orgDetailsSlice = createSlice({
  name: "orgDetails",
  initialState: {
    orgDetails: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrgDetails.fulfilled, (state, action) => {
        state.orgDetails = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrgDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
      
  },
});

export { fetchOrgDetails};
export default orgDetailsSlice.reducer;
