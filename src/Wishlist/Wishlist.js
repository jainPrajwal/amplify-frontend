import { ContainerEcommerce } from "../Product/components/ContainerEcommerce";
import { CardWishlist } from "./components/CardWishlist";

const Wishlist = () => {
  return (
    <>
      <div className="header header-secondary text-black text-center">
        Your Wishlist
      </div>
      <ContainerEcommerce>
        <CardWishlist />
      </ContainerEcommerce>
    </>
  );
};

export { Wishlist };
