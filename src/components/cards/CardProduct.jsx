import { useEffect } from "react";
import { useProducts } from "../../contexts/useProducts";
import { Badge } from "./Badge";
import { CardItemInStore } from "./CardItemInStore";

const CardProduct = () => {
  const { state, dispatch } = useProducts();
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "LOAD_PRODUCTS" });
    }, 3000);
  }, []);
  console.log("products", state.store);
  return state.store.map((product) => {
    return (
      <>
        <CardItemInStore product={product} />
      </>
    );
  });
};

export { CardProduct };
