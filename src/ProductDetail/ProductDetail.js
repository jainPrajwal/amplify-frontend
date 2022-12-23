import { useProducts } from "../Product/context/useProducts";
import loadingImage from "../assets/images/loading.gif";
import { CardItemDetails } from "./components/CardItemDetails";
import "./productDetail.css";
import { useParams } from "react-router";
import { useState } from "react";
const ProductDetail = () => {
  const { state } = useProducts();

  return state.store.length > 0 ? (
    <main className="container-prod-details">
      <div>
        <CardItemDetails store={state.store} />
      </div>
    </main>
  ) : (
    <div className="wrapper-loading">
      <img src={loadingImage} className="w-100 h-auto" alt="loading" />
    </div>
  );
};

export { ProductDetail };
