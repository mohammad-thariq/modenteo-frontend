import React, { useState, useEffect } from "react";
import "./App.css";
import { useQuery } from "react-query";
import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import { LoginPage, HomePage, HomeMenPage, HomeKidsPage, HomeWomenPage, RegistrationPage, ForgotPasswordPage, BaseAccount, Base, CartPage, MainCategoryPage, ProductListingPage, DashboardPage, OrdersPage, OrderDetailsPage, WebPage, ProductPage, WishlistPage, ProfilePage, ChildCategoryPage, CheckoutPage, OrderPlacedPage, SeasonsPage, NewCollectionsPage, } from "./pages";
import { LocalStorageHelper } from "./utils/localStorage";
import { localStorageConst } from "./constants/localStorage";
import { AuthorizationApi } from "./service";
import { SetExpireToken } from "./helper/expire";
import { Loading } from "./common";

const App = () => {
  const { validateToken } = new AuthorizationApi();
  const { data, isLoading } = useQuery(["validate-token"], validateToken);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Initialize with null to represent loading state

  useEffect(() => {
    const userAuthToken = LocalStorageHelper.getItem(localStorageConst.JWTUSER);
    if (userAuthToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const userAuthToken = LocalStorageHelper.getItem(localStorageConst.JWTUSER);
    if (userAuthToken && data) {
      SetExpireToken(data);
      setIsLoggedIn(true);
    } else {
      let userDetails = LocalStorageHelper?.getItem(localStorageConst?.JWTUSER);
      setIsLoggedIn(userDetails ? true : false);
    }
  }, [data]);

  if (isLoading || isLoggedIn === null) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Base><HomePage /></Base>} />
        <Route exact path="/home-mens" element={<Base><HomeMenPage /></Base>} />
        <Route exact path="/home-womens" element={<Base><HomeWomenPage /></Base>} />
        <Route exact path="/home-kids" element={<Base><HomeKidsPage /></Base>} />
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
              path="/order-details/:id"
              element={
                <BaseAccount>
                  <OrderDetailsPage />
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

          </>
        )}
        <Route
          path="/cart"
          element={
            <Base>
              <CartPage />
            </Base>
          }
        />
        <Route
          path="/categories"
          element={
            <Base>
              <MainCategoryPage />
            </Base>
          }
        />
        <Route
          path="/new"
          element={
            <Base>
              <NewCollectionsPage />
            </Base>
          }
        />
        <Route
          path="/seasons"
          element={
            <Base>
              <SeasonsPage />
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
              <ProductListingPage />
            </Base>
          }
        />
        <Route
          path="/products"
          element={
            <Base>
              <ChildCategoryPage />
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
        <Route
          path="/page/:slug"
          element={
            <Base>
              <WebPage />
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
