import { useEffect } from "react";
import { useProducts } from "../../contexts/useProducts";
import { CardItemInStore } from "./CardItemInStore";

const CardProduct = () => {
  const { state, dispatch } = useProducts();
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "LOAD_PRODUCTS" });
    }, 3000);
  }, []);

  return state.store.map((product, index, store) => {
    return <CardItemInStore product={product} key={product.id} store={store} />;
  });
};

export { CardProduct };
