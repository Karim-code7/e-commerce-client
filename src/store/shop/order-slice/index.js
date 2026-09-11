import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/config";

const initialState = {
  approvaleURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDeatils: null,
};
export const createOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      `${API_URL}/api/shop/order/create`,
      orderData,
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
);
export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ paymentId, payerID, orderId }) => {
    const response = await axios.post(
      `${API_URL}/api/shop/order/capture`,
      { paymentId, payerID, orderId },
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
);
export const getAllOrderByUserId = createAsyncThunk(
  "/order/getAllOrderByUserId",
  async (userId) => {
    const response = await axios.get(
      `${API_URL}/api/shop/order/getAllOrder/${userId}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
);
export const getOrderDeatils = createAsyncThunk(
  "/order/getOrderDeatils",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/api/shop/order/getOrderDeatils/${id}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
);
const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDeatils: (state) => {
      state.orderDeatils = null;
    },
  },
  extraReducers: (bulder) => {
    bulder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvaleURL = action.payload.approvaleURL;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId),
        );
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvaleURL = null;
        state.orderId = null;
      })
      .addCase(getAllOrderByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrderByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrderByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = null;
      })
      .addCase(getOrderDeatils.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDeatils.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDeatils = action.payload.data;
      })
      .addCase(getOrderDeatils.rejected, (state) => {
        state.isLoading = false;
        state.orderDeatils = null;
      });
  },
});

export const { resetOrderDeatils } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
