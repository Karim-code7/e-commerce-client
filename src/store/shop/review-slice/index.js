import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/config";

const initialState = {
  isLoading: false,
  reviews: [],
};
export const addReview = createAsyncThunk("shop/addReview", async (data) => {
  try {
    const result = await axios.post(`${API_URL}/api/shop/review/add`, data, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    return error.response.data;
  }
});
export const getReview = createAsyncThunk(
  "shop/getReview",
  async (productId) => {
    const result = await axios.get(`${API_URL}/api/shop/review/${productId}`, {
      withCredentials: true,
    });
    return result.data;
  },
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addReview.pending, (state) => {
      state.isLoading = true;
      state.reviews = null;
    });
    builder.addCase(addReview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reviews = action.payload.data;
    });
    builder.addCase(addReview.rejected, (state) => {
      state.isLoading = false;
      state.reviews = null;
    });
    builder.addCase(getReview.pending, (state) => {
      state.isLoading = true;
      state.reviews = null;
    });
    builder.addCase(getReview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reviews = action.payload.data;
    });
    builder.addCase(getReview.rejected, (state) => {
      state.isLoading = false;
      state.reviews = null;
    });
  },
});

export default reviewSlice.reducer;
