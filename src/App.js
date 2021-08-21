import "./App.css";
import { Cart, Home, Store, Wishlist } from "./pages";

import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { ProductDetail } from "./pages/ProductDetail";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "AMPLIFY-ONLINE ECOMMERCE APP FOR HEADPHONES";
  }, []);

  return (
    <div className="App">
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
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
