import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// تعريف رابط الـ API ليقرأ من متغيرات البيئة تلقائياً أو يستخدم localhost افتراضياً
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const initialState = {
  isLoading: false,
  productList: [],
  productDeatils: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addNewProduct",
  async (formData) => {
    const result = await axios.post(
      `${API_URL}/api/admin/products/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    return result?.data;
  },
);

export const getProductDeatilsForAdmin = createAsyncThunk(
  "/products/getProductDeatilsForAdmin",
  async (id) => {
    const result = await axios.get(
      `${API_URL}/api/admin/products/get-productDetails/${id}`,
      { withCredentials: true },
    );
    return result?.data;
  },
);

export const fetchAllProduct = createAsyncThunk(
  "/products/fetchAllProduct",
  async () => {
    const result = await axios.get(
      `https://e-commerce-server-pi.vercel.app/api/admin/products/get`,
      {
        withCredentials: true,
      },
    );
    return result?.data;
  },
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${API_URL}/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    return result?.data;
  },
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `${API_URL}/api/admin/products/delete/${id}`,
      {
        withCredentials: true,
      },
    );

    return result?.data;
  },
);

const AdminProudctsSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProduct.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(getProductDeatilsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDeatilsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDeatils = action.payload.data;
      })
      .addCase(getProductDeatilsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.productDeatils = [];
      });
  },
});

export default AdminProudctsSlice.reducer;
