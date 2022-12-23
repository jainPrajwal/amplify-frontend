import { createContext, useReducer } from "react";
import { reducerCart } from "../reducer/ReducerCart";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerCart, []);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
export { CartProvider };
