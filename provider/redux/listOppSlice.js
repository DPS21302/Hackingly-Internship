import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "@/utils/BaseURL";

export const listOpportunity = createAsyncThunk(
  "listOpportunity/fetchListOpportunity",
  async () => {
    try {
      const response = await axios.get(`${baseURL}/opportunity/list/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const listOppById = createAsyncThunk(
  "listOpportunity/fetchListOppById",
  async ({ id, token }, { rejectWithValue }) => {
    
    try {
        console.log("id", id);
      const response = await axios.get(`${baseURL}/opportunity/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response.......", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const listOpportunitySlice = createSlice({
  name: "listOpportunity",
  initialState: {
    loading: false,
    data: null,
    isError: false,
    error: null,
  },
  reducers: {
    // Custom reducers can be added here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(listOpportunity.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(listOpportunity.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(listOpportunity.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      });
    builder
      .addCase(listOppById.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(listOppById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(listOppById.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export default listOpportunitySlice.reducer;
