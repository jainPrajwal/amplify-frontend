import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";

import "./App.css";
import { useAuth } from "./Auth/context/useAuth";
import { Login } from "./Auth/login/Login";
import { PrivateRoute } from "./Auth/PrivateRoute";
import { SignUp } from "./Auth/signup/signup";
import { Cart } from "./Cart/Cart";
import { useCart } from "./Cart/context/useCart";
import { Navbar } from "./Home/components/navbar/Navbar";

import { Home } from "./Home/Home";
import { PageNotFound } from "./PageNotFound/PageNotFound";
import { useProducts } from "./Product/context/useProducts";
import { Store } from "./Product/Store";
import { ProductDetail } from "./ProductDetail/ProductDetail";
import { useWishlist } from "./Wishlist/context/useWishlist";
import { Wishlist } from "./Wishlist/Wishlist";
import loadingImage from "../src/assets/images/loading.gif";

import { BASE_API } from "./constants/api";
import { Checkout } from "./Checkout/Checkout";
import { AddressProvider } from "./Address/context/address-context";
import { SingleOrderPage } from "./SingleOrderPage/SingleOrderPage";
import { Orders } from "./Orders/Orders";
import { OrdersProvider } from "./Payment/context/orders-context";

function App() {
  const { state: store, dispatch: storeDispatch } = useProducts();
  const { dispatch: cartDispatch } = useCart();

  const { dispatch: wishlistDispatch } = useWishlist();
  const [width, setWidth] = useState(1);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (width < 100 && width >= 0) {
        width && setWidth((prevWidth) => prevWidth + 10);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, [width]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        storeDispatch({ type: "STATUS", payload: "loading" });
        const response = await axios.get(`${BASE_API}/products`);

        storeDispatch({
          type: "LOAD_PRODUCTS",
          payload: { products: response.data.products },
        });

        storeDispatch({ type: "STATUS", payload: "idle" });
        setWidth(undefined);
      } catch (error) {
        storeDispatch({ type: "STATUS", payload: "error" });
      }
    };

    getProducts();
  }, [storeDispatch]);

  useEffect(() => {
    const loadCart = async (userId) => {
      try {
        storeDispatch({ type: "STATUS", payload: "loading" });
        const {
          data: { success, cart },
        } = await axios.get(`${BASE_API}/cart/${userId}`);

        if (success) {
          cartDispatch({
            type: "LOAD_CART",
            payload: { cart },
          });

          storeDispatch({ type: "STATUS", payload: "idle" });
        }
      } catch (error) {
        storeDispatch({ type: "STATUS", payload: "error" });
      }
    };

    if (loggedInUser.token) {
      loadCart(loggedInUser.userId);
    }
  }, [loggedInUser, cartDispatch, storeDispatch]);

  useEffect(() => {
    const loadWishlist = async (userId) => {
      try {
        storeDispatch({ type: "STATUS", payload: "loading" });
        const {
          data: { success, wishlist },
        } = await axios.get(`${BASE_API}/wishlist/${userId}`);

        if (success) {
          storeDispatch({ type: "STATUS", payload: "idle" });
          wishlistDispatch({
            type: "LOAD_WISHLIST",
            payload: { wishlist: wishlist.wishlistItems },
          });
        }
      } catch (error) {
        storeDispatch({ type: "STATUS", payload: "error" });
      }
    };

    if (loggedInUser.token) {
      loadWishlist(loggedInUser.userId);
    }
  }, [loggedInUser, storeDispatch, wishlistDispatch]);

  return (
    <div className="App">
      <div
        className="loader-top"
        style={{ width: width > 90 ? `${width}%` : `${0}%` }}
      ></div>

      <Navbar />
      <div className="container-amplify">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/store"
            element={
              store?.store?.length > 0 ? (
                <Store />
              ) : (
                <div className="wrapper-loading">
                  <img
                    src={loadingImage}
                    alt="loader"
                    className="w-100 h-auto"
                  />
                </div>
              )
            }
          />
          <PrivateRoute path="/cart" element={<Cart />} />
          <PrivateRoute path="/wishlist" element={<Wishlist />} />
          <PrivateRoute
            path={`/orders`}
            element={
              <OrdersProvider>
                <AddressProvider>
                  <Orders />
                </AddressProvider>
              </OrdersProvider>
            }
          />
          <PrivateRoute
            path={`/orders/:orderId`}
            element={
              <OrdersProvider>
                <AddressProvider>
                  <SingleOrderPage />
                </AddressProvider>
              </OrdersProvider>
            }
          />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <PrivateRoute
            path="/checkout"
            element={
              <OrdersProvider>
                <AddressProvider>
                  <Checkout />
                </AddressProvider>
              </OrdersProvider>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
