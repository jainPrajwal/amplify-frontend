import { useWishlist } from "../../contexts/useWishlist";
import { CardItemInWishlist } from "./CardItemInWishlist";

const CardWishlist = () => {
  const { state: wishlist } = useWishlist();
  return wishlist.map((wishlistedItem) => {
    return (
      <CardItemInWishlist
        wishlistedItem={wishlistedItem}
        key={wishlistedItem._id}
      />
    );
  });
};

export { CardWishlist };
