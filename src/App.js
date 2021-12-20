import "./App.css";
import { Cart, Home, Store, Wishlist } from "./pages";

import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { ProductDetail } from "./pages/ProductDetail";
import { useEffect, useState } from "react";
import { PrivateRoute } from "./PrivateRoute";
import { Login } from "./pages/login/Login";
import { SignUp } from "./pages/signup/signup";
import { useProducts } from "./contexts/useProducts";

function App() {
  const { dispatch: storeDispatch } = useProducts();
  const [width, setWidth] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (width < 100 && width >= 0) {
        console.log("setting width", width);
        width && setWidth((prevWidth) => prevWidth + 10);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, [width]);
  useEffect(() => {
    storeDispatch({ type: "STATUS", payload: "loading" });
    const timeOutId = setTimeout(() => {
      storeDispatch({ type: "LOAD_PRODUCTS" });
      storeDispatch({ type: "STATUS", payload: "idle" });
      setWidth(undefined);
    }, 3000);

    return () => clearTimeout(timeOutId);
  }, [storeDispatch]);

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
          <Route path="/store" element={<Store />} />
          <PrivateRoute path="/cart" element={<Cart />} />
          <PrivateRoute path="/wishlist" element={<Wishlist />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
