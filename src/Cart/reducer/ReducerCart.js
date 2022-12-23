import { removeFromCart } from "../../utils";

const reducerCart = (state, { type, payload }) => {
  switch (type) {
    case "LOAD_CART":
      return payload?.cart?.cartItems;

    case "ADD_TO_CART":
      return state.concat(payload.cartItem);

    case "INCREASE_QUANTITY":
      return state.map((itemInCart) => {
        return itemInCart._id === payload?.newCartItem._id
          ? { ...payload.newCartItem }
          : itemInCart;
      });

    case "DECREASE_QUANTITY":
      return state.map((itemInCart) =>
        itemInCart._id === payload?.newCartItem._id
          ? { ...payload.newCartItem }
          : itemInCart
      );

    case "REMOVE_FROM_CART":
      return removeFromCart(state, payload);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};
export { reducerCart };
