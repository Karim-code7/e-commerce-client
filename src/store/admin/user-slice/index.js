import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/config";

const initialState = {
  isLoading: false,
  userDeatils: [],
};
export const fetchUser = createAsyncThunk(
  "adminUser/fetchUser",
  async ({ userId }) => {
    // 🌟 ضع الأقواس هنا لتطابق الـ useEffect
    const result = await axios.get(
      `${API_URL}/api/admin/user/fetchUser/${userId}`,
      {
        withCredentials: true,
      },
    );
    return result?.data;
  },
);

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState,
  reducers: {
    setUserDeatils: (state) => {
      state.userDeatils = [];
    },
    setIsLoading: (state) => {
      state.isLoading = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDeatils = action.payload.data;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
        state.userDeatils = [];
      });
  },
});
export default adminUserSlice.reducer;
export const { setUserDeatils, setIsLoading } = adminUserSlice.actions;
