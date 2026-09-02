import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  allImageFeatures: [],
};

export const uploadImage = createAsyncThunk(
  "image/uploadImage",
  async (data) => {
    const response = await axios.post(
      "http://localhost:5000/api/common/features-image/upload-image",
      data,
      { withCredentials: true },
    );
    return response.data;
  },
);

export const getFeatureImages = createAsyncThunk(
  "image/getFeatureImages",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/common/features-image/all-images",
      { withCredentials: true },
    );
    return response.data;
  },
);

export const deleteFeatureImage = createAsyncThunk(
  "image/deleteImage",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/common/features-image/${id}`,
      { withCredentials: true },
    );
    return response.data;
  },
);

const featureImageSlice = createSlice({
  name: "featureImage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.imageLoadingState = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.imageLoadingState = false;
        state.allImageFeatures = action.payload.data;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.imageLoadingState = false;
      })
      .addCase(getFeatureImages.pending, (state) => {
        state.imageLoadingState = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.imageLoadingState = false;
        state.allImageFeatures = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state, action) => {
        state.imageLoadingState = false;
      })
      .addCase(deleteFeatureImage.pending, (state) => {
        state.imageLoadingState = true;
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.imageLoadingState = false;
      })
      .addCase(deleteFeatureImage.rejected, (state, action) => {
        state.imageLoadingState = false;
      });
  },
});

export default featureImageSlice.reducer;
