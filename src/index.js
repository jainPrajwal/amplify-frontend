import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { NotificationProvider } from "./Home/components/notification/context/notification-context";
import { AuthProvider } from "./Auth/context/auth-context";
import { WishlistProvider } from "./Wishlist/context/wishlist-context";
import { CartProvider } from "./Cart/context/cart-context";
import { ProductsProvider } from "./Product/context/products-context";
import { OrdersProvider } from "./Payment/context/orders-context";
import { CouponProvider } from "./Cart/context/coupon-context";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <ProductsProvider>
                {/* <OrdersProvider> */}
                <CouponProvider>
                  <App />
                </CouponProvider>
                {/* </OrdersProvider> */}
              </ProductsProvider>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
