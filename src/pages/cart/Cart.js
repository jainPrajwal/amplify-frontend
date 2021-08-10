import { CardCart } from "../../components/cards/CardCart";
import { ContainerEcommerce } from "../../components/cards/ContainerEcommerce";
const Cart = () => {
  return (
    <>
      <div className="header header-secondary text-black text-center">
        Your Cart
      </div>
      <div className="container-cart-details">
        <div className="container-cart-details-grid">
          <CardCart />
        </div>
      </div>
    </>
  );
};

export { Cart };
