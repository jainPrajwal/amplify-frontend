import { useCart } from "../../contexts/useCart";
import { CardItemInCart } from "./CardItemInCart";

const CardCart = () => {
  const { state: cart, dispatch: cartDispatch } = useCart();
  return cart.map((itemInCart, index, cart) => {
    return (
      <CardItemInCart
        key={itemInCart.color.concat(itemInCart._id)}
        itemInCart={itemInCart}
        cart={cart}
        cartDispatch={cartDispatch}
      />
    );
  });
};

export { CardCart };
