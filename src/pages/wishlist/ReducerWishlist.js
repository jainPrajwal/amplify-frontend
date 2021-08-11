export const updateWishlist = (state, product, operation) => {
  switch (operation) {
    case "REMOVE_FROM_WISHLIST":
      return state.filter((iteminWishlist) => iteminWishlist.id !== product.id);

    case "ADD_TO_WISHLIST":
      return state.concat(product);
  }
};
export const checkIfItemIsAlreadyPresentInArray = (state, product) => {
  return state.find((item) => item.id === product.id);
};
const ReducerWishlist = (state, { type, payload }) => {
  switch (type) {
    case "TOGGLE_WISHLIST":
      return updateWishlist(
        state,
        payload,
        checkIfItemIsAlreadyPresentInArray(state, payload)
          ? "REMOVE_FROM_WISHLIST"
          : "ADD_TO_WISHLIST"
      );

    default:
      return state;
  }
};

export { ReducerWishlist };
