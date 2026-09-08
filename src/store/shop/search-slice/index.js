import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  searchProducts: [],
};
const URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const fetchSearchProducts = createAsyncThunk(
  "shop/fetchSearchProducts",
  async (keyword) => {
    const result = await axios.get(`${URL}/api/shop/search/${keyword}`, {
      withCredentials: true,
    });
    return result.data;
  },
);
const shopSearchSlice = createSlice({
  name: "searchProducts",
  initialState,
  reducers: {
    clearSearchProducts: (state) => {
      state.searchProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSearchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchProducts = action.payload.data;
      })
      .addCase(fetchSearchProducts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { clearSearchProducts } = shopSearchSlice.actions;
export default shopSearchSlice.reducer;
