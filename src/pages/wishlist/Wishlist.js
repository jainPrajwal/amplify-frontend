import { ContainerEcommerce } from "../../components";
import { CardWishlist } from "../../components/cards/CardWishlist";

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
