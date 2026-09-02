import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsSlice from "./admin/products-slice";
import featureImageSlice from "./common/index";
import shopProductSlice from "./shop/product-slice";
import shopCartSlice from "./shop/cart-slice/index";
import shopAddressSlice from "./shop/address-slice/index";
import adminOrderSlice from "./admin/products-slice/order-slice";
import adminUserSlice from "./admin/user-slice/index";
import shoppingOrderSlice from "./shop/order-slice/index";
import shopSearchSlice from "./shop/search-slice/index";
import shopReviewSlice from "./shop/review-slice";
import adminAnalyticsSlice from "./admin/analytics-slice/index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    adminOrders: adminOrderSlice,
    adminUser: adminUserSlice,
    adminAnalytics: adminAnalyticsSlice,
    featureImage: featureImageSlice,
    shopProducts: shopProductSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shoppingOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,
  },
});

export default store;
