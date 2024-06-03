import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  LoginPage,
  HomePage,
  RegistrationPage,
  ForgotPasswordPage,
  BaseAccount,
  Base,
  CartPage,
  MainCategoryPage,
  SubCategoryPage,
  DashboardPage,
  OrdersPage,
  ProductPage,
  WishlistPage,
  ProfilePage,
  ChildCategoryPage,
  CheckoutPage,
  OrderPlacedPage,
} from "./pages";
import { LocalStorageHelper } from "./utils/localStorage";
import { localStorageConst } from "./constants/localStorage";

const App = () => {
  let userDetails = LocalStorageHelper?.getItem(localStorageConst?.JWTUSER);
  const isLoggedIn = userDetails ? true : false;
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Base>
              <HomePage />
            </Base>
          }
        />
        {isLoggedIn && (
          <>
            <Route
              path="/dashboard"
              element={
                <BaseAccount>
                  <DashboardPage />
                </BaseAccount>
              }
            />
            <Route
              path="/profile"
              element={
                <BaseAccount>
                  <ProfilePage />
                </BaseAccount>
              }
            />
            <Route
              exact
              path="/orders"
              element={
                <BaseAccount>
                  <OrdersPage />
                </BaseAccount>
              }
            />
            <Route
              path="/wishlist"
              element={
                <Base>
                  <WishlistPage />
                </Base>
              }
            />
            <Route
              path="/checkout"
              element={
                <Base>
                  <CheckoutPage />
                </Base>
              }
            />
            <Route
              path="/order-sucess"
              element={
                <Base>
                  <OrderPlacedPage />
                </Base>
              }
            />
            <Route
              path="/cart"
              element={
                <Base>
                  <CartPage />
                </Base>
              }
            />
          </>
        )}
        <Route
          path="/categories"
          element={
            <Base>
              <MainCategoryPage />
            </Base>
          }
        />
        <Route
          exact
          path="/category/new/:id"
          element={
            <Base>
              <ChildCategoryPage />
            </Base>
          }
        />
        <Route
          exact
          path="/category/:cat/:id"
          element={
            <Base>
              <ChildCategoryPage />
            </Base>
          }
        />
        <Route
          path="/category/:id"
          element={
            <Base>
              <SubCategoryPage />
            </Base>
          }
        />

        <Route
          path="/product/:id"
          element={
            <Base>
              <ProductPage />
            </Base>
          }
        />

        {!isLoggedIn && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
