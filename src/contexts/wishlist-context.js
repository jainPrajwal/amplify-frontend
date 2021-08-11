import { createContext, useReducer } from "react";
import { ReducerWishlist } from "../pages/wishlist/ReducerWishlist";

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ReducerWishlist, []);
  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export { WishlistProvider };
