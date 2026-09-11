import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/config";

const initialState = {
  isLoading: false,
  products: [],
  productDeatails: null,
};
export const fetchAllFiltred = createAsyncThunk(
  "/shopProduct/fetchAllProduct",
  async ({ filterParams, sortParams }) => {
    // 1. تحويل الفلاتر والترتيب لـ String
    const queryString = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    }).toString();
    // 2. إرسال الـ Query مع الرابط
    const result = await axios.get(
      `${API_URL}/api/shop/products/all-products?${queryString}`,
      {
        withCredentials: true,
      },
    );

    return result.data;
  },
);

export const fetchProductDeatils = createAsyncThunk(
  "/shopProduct/fetchProductDetails",
  async (id) => {
    const result = await axios.get(`${API_URL}/api/shop/products/details/${id}`, {
      withCredentials: true,
    });

    return result.data;
  },
);

const shopProductSlice = createSlice({
  name: "shopProduct",
  initialState,
  reducers: {
    setCartDeatils: (state, action) => {
      state.productDeatails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFiltred.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFiltred.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
      })
      .addCase(fetchAllFiltred.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchProductDeatils.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDeatils.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDeatails = action.payload.data;
      })
      .addCase(fetchProductDeatils.rejected, (state) => {
        state.productDeatails = null;
        state.isLoading = false;
      });
  },
});

export default shopProductSlice.reducer;
export const { setProductDetails } = shopProductSlice.actions;
