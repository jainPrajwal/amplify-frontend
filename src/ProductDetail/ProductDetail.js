import { useProducts } from "../Product/context/useProducts";
import loadingImage from "../assets/images/loading.gif";
import { CardItemDetails } from "./components/CardItemDetails";
import "./productDetail.css";
const ProductDetail = () => {
  const { state } = useProducts();

  return state.store.length > 0 ? (
    <div className="container-prod-details">
      <div className="container-prod-details-grid">
        <CardItemDetails store={state.store} />
      </div>
    </div>
  ) : (
    <div className="wrapper-loading">
      <img src={loadingImage} className="w-100 h-auto" alt="loading" />
    </div>
  );
};

export { ProductDetail };
