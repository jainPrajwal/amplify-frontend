const ReducerWishlist = (state, { type, payload }) => {
  switch (type) {
    case "LOAD_WISHLIST":
      return payload?.wishlist;

    case "REMOVE_FROM_WISHLIST":
      return state.filter(
        (iteminWishlist) => iteminWishlist._id !== payload?.product._id
      );

    case "ADD_TO_WISHLIST":
      return payload.updatedWishlist;

    default:
      return state;
  }
};

export { ReducerWishlist };
