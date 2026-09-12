import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
// import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingLising from "./pages/shopping-view/lising";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAdmin, checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaypalCancelPage from "./pages/shopping-view/paypal-cansel";
import PaymentSuccess from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import AdminDashboard from "./pages/admin-view/dashboard";

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(checkAdmin());
    }
  }, [dispatch, user?.role]);

  return (
    <div className=" overflow-hidden  ">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              isLoading={isLoading}
            >
              <AuthLayout />
            </CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              isLoading={isLoading}
            >
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              isLoading={isLoading}
            >
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              isLoading={isLoading}
            >
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingLising />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="paypal-cansel" element={<PaypalCancelPage />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
    </div>
  );
};

export default App;
