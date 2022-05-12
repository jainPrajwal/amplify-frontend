import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { v4 } from "uuid";
import "./App.css";
import { useAuth } from "./Auth/context/useAuth";
import { Login } from "./Auth/login/Login";
import { PrivateRoute } from "./Auth/PrivateRoute";
import { SignUp } from "./Auth/signup/signup";
import { Cart } from "./Cart/Cart";
import { useCart } from "./Cart/context/useCart";
import { Navbar } from "./Home/components/navbar/Navbar";
import { useNotifications } from "./Home/components/notification/context/useNotifications";
import { Home } from "./Home/Home";
import { PageNotFound } from "./PageNotFound/PageNotFound";
import { useProducts } from "./Product/context/useProducts";
import { Store } from "./Product/Store";
import { ProductDetail } from "./ProductDetail/ProductDetail";
import { useWishlist } from "./Wishlist/context/useWishlist";
import { Wishlist } from "./Wishlist/Wishlist";
import loadingImage from "../src/assets/images/loading.gif"

function App() {
  const { state: store, dispatch: storeDispatch } = useProducts();
  const { dispatch: cartDispatch } = useCart();
  const { dispatch: notificationDispatch } = useNotifications();
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
    storeDispatch({ type: "STATUS", payload: "loading" });
    const getProducts = async () => {
      try {
        const response = await axios.get(
          "https://amplitude-backend.herokuapp.com/products"
        );

        storeDispatch({
          type: "LOAD_PRODUCTS",
          payload: { products: response.data.products },
        });
        console.log(`products received`);
        storeDispatch({ type: "STATUS", payload: "idle" });
        setWidth(undefined);
      } catch (error) {
        console.log("error", error.response);
        storeDispatch({ type: "STATUS", payload: "error" });
      }
    };

    getProducts();

    // const timeOutId = setTimeout(() => {}, 3000);

    // return () => clearTimeout(timeOutId);
  }, []);

  useEffect(() => {
    const loadCart = async (userId) => {
      try {
        storeDispatch({ type: "STATUS", payload: "loading" });
        const {
          data: { success, message, cart },
        } = await axios.get(
          `https://amplitude-backend.herokuapp.com/cart/${userId}`
        );

        if (success) {
          cartDispatch({
            type: "LOAD_CART",
            payload: { cart },
          });
          notificationDispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: v4(),
              type: "DANGER",
              message,
            },
          });
          storeDispatch({ type: "STATUS", payload: "idle" });
        }
      } catch (error) {
        storeDispatch({ type: "STATUS", payload: "error" });
        console.log("error", error?.response?.data?.errorMessage);
      }
    };

    if (loggedInUser.token) {
      loadCart(loggedInUser.userId);
    }
  }, [loggedInUser]);

  useEffect(() => {
    storeDispatch({ type: "STATUS", payload: "loading" });
    const loadWishlist = async (userId) => {
      try {
        const {
          data: { success, message, wishlist },
        } = await axios.get(
          `https://amplitude-backend.herokuapp.com/wishlist/${userId}`
        );
        console.log("wishlist", wishlist);
        if (success) {
          storeDispatch({ type: "STATUS", payload: "idle" });
          wishlistDispatch({
            type: "LOAD_WISHLIST",
            payload: { wishlist: wishlist.wishlistItems },
          });

          notificationDispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: v4(),
              type: "SUCCESS",
              message,
            },
          });
        }
      } catch (error) {
        storeDispatch({ type: "STATUS", payload: "error" });
        console.log("error", error?.response?.data?.errorMessage);
      }
    };

    if (loggedInUser.token) {
      loadWishlist(loggedInUser.userId);
    }
  }, [loggedInUser]);

  return (
    <div className="App">
      <div
        className="loader-top"
        style={{ width: width > 90 ? `${width}%` : `${0}%` }}
      ></div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

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
                  alt="loading"
                  className="w-100 h-auto"
                />
                </div>
              )
            }
          />
          <PrivateRoute path="/cart" element={<Cart />} />
          <PrivateRoute path="/wishlist" element={<Wishlist />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
