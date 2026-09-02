import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  allOrders: [],
  orderDeatils: [],
};

export const getAllOrdersByAdmin = createAsyncThunk(
  "adminOrder/getAllOrdersByAdmin",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/admin/order/getAllOrders",
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
);
export const getOrderDeatilsForAdmin = createAsyncThunk(
  "adminOrder/getOrderDeatilsForAdmin",
  async ({ id }) => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/order/getOrderDeatilsForAdmin/${id}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
);
export const updateOrderStatus = createAsyncThunk(
  "adminOrder/updateOrderStatus",
  async ({ id, status }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/order/updateOrderStatus`,
      { id, status },
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
);

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {
    setOrderDeatils: (state) => {
      state.orderDeatils = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllOrdersByAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllOrdersByAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allOrders = action.payload.data;
    });
    builder.addCase(getAllOrdersByAdmin.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getOrderDeatilsForAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderDeatilsForAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderDeatils = action.payload.data;
    });
    builder.addCase(getOrderDeatilsForAdmin.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateOrderStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateOrderStatus.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setOrderDeatils } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
