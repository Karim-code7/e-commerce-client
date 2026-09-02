import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  addresseList: [],
  loading: false,
};

export const addNewAddres = createAsyncThunk(
  "addreses/addNewAddress",
  async (formData) => {
    const response = await axios.post(
      `http://localhost:5000/api/shop/address/add`,
      formData,
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
);
export const fetchAllAddresses = createAsyncThunk(
  "addreses/fetchAllAddresses",
  async ({ userId }) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/address/get/${userId}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
);

export const editAddress = createAsyncThunk(
  "addreses/editAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `http://localhost:5000/api/shop/address/update/${userId}/${addressId} `,
      formData,
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
);

export const deleteAddress = createAsyncThunk(
  "addreses/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `http://localhost:5000/api/shop/address/delete/${userId}/${addressId} `,
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddres.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewAddres.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addNewAddres.rejected, (state) => {
        state.loading = false;
        state.addresseList = null;
      })
      .addCase(editAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresseList = action.payload.data;
      })
      .addCase(editAddress.rejected, (state) => {
        state.loading = false;
        state.addresseList = null;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresseList = action.payload.data;
      })
      .addCase(deleteAddress.rejected, (state) => {
        state.loading = false;
        state.addresseList = null;
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresseList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.loading = false;
        state.addresseList = null;
      });
  },
});

export default addressSlice.reducer;
