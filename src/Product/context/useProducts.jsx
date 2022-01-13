import { useContext } from "react";
import { ProductsContext } from "./products-context";

const useProducts = () => {
  return useContext(ProductsContext);
};

export { useProducts };
