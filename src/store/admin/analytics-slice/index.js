import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  analyticsData: null,
  statusData: [],
  isLoading: false,
};
const URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getAllAnalyticsData = createAsyncThunk(
  "adminAnalytics/getAllAnalyticsData",
  async ({ startDate, endDate }) => {
    const response = await axios.get(
      `${URL}/api/admin/analytics?startDate=${startDate}&endDate=${endDate}`,
      {
        withCredentials: true,
      },
    );
    console.log(response);
    return response.data;
  },
);
export const getDashboardStatusData = createAsyncThunk(
  "adminAnalytics/getDashboardStatusData",
  async () => {
    const response = await axios.get(`${URL}/api/admin/analytics/status`, {
      withCredentials: true,
    });
    return response.data;
  },
);

const adminAnalyticsSlice = createSlice({
  name: "adminAnalytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAnalyticsData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllAnalyticsData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.analyticsData = action.payload.data;
      console.log(action.payload.data);
    });
    builder.addCase(getAllAnalyticsData.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getDashboardStatusData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDashboardStatusData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.statusData = action.payload.data;
    });
    builder.addCase(getDashboardStatusData.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default adminAnalyticsSlice.reducer;
