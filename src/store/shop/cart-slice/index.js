import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoding: false,
  trashLoading: false,
  ubdateLodaing: false,
};
const URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    try {
      const response = await axios.post(
        `${URL}/api/shop/cart/add`,
        {
          userId,
          productId,
          quantity,
        },
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
);
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async ({ userId }) => {
    const response = await axios.get(`${URL}/api/shop/cart/get/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  },
);
export const deleteCartItems = createAsyncThunk(
  "cart/deleteCartItems",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `${URL}/api/shop/cart/delete-item/${userId}/${productId}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
);
export const ubdateCartQuantity = createAsyncThunk(
  "cart/ubdateCartQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      `${URL}/api/shop/cart/ubdate-cart`,

      {
        userId,
        productId,
        quantity,
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
);
const shoppingCartSlice = createSlice({
  name: "shopCartSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.isLoding = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoding = false;
      state.cartItems = action.payload.data;
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.isLoding = false;
      state.cartItems = [];
    });
    builder.addCase(fetchCartItems.pending, (state) => {
      state.isLoding = true;
    });
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.isLoding = false;
      state.cartItems = action.payload.data;
    });
    builder.addCase(fetchCartItems.rejected, (state) => {
      state.isLoding = false;
      state.cartItems = [];
    });
    builder.addCase(ubdateCartQuantity.pending, (state) => {
      state.ubdateLodaing = true;
    });
    builder.addCase(ubdateCartQuantity.fulfilled, (state, action) => {
      state.ubdateLodaing = false;
      state.cartItems = action.payload.data;
    });
    builder.addCase(ubdateCartQuantity.rejected, (state) => {
      state.cartItems = [];
      state.ubdateLodaing = false;
    });
    builder.addCase(deleteCartItems.pending, (state) => {
      state.trashLoading = true;
    });
    builder.addCase(deleteCartItems.fulfilled, (state, action) => {
      state.trashLoading = false;
      state.cartItems = action.payload.data;
    });
    builder.addCase(deleteCartItems.rejected, (state) => {
      state.trashLoading = false;

      state.cartItems = [];
    });
  },
});

export default shoppingCartSlice.reducer;
