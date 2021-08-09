import { createContext, useReducer } from "react";
import {
  initialState,
  reducerCallbackFunction,
} from "../pages/store/ReducerStore";

export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerCallbackFunction, initialState);
  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider };
