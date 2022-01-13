import { useContext } from "react";
import { CartContext } from "./cart-context";

const useCart = () => {
  return useContext(CartContext);
};

export { useCart };
