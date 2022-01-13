import { useContext } from "react";
import { WishlistContext } from "./wishlist-context";

const useWishlist = () => {
  return useContext(WishlistContext);
};

export { useWishlist };
