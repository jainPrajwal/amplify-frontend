// export const updateWishlist = (state, product, operation) => {
//   switch (operation) {
//     case "REMOVE_FROM_WISHLIST":
//       return state.filter(
//         (iteminWishlist) => iteminWishlist._id !== product._id
//       );

//     case "ADD_TO_WISHLIST":
//       return state.concat(product);

//     default:
//       return state;
//   }
// };
export const checkIfItemIsAlreadyPresentInArray = (state, product) => {

  return state.some((item) => {
    return item.productId == product._id;
  });
};
const ReducerWishlist = (state, { type, payload }) => {
  switch (type) {
    case "LOAD_WISHLIST":
     
      return payload?.wishlist;

    case "REMOVE_FROM_WISHLIST":
      return state.filter(
        (iteminWishlist) => iteminWishlist._id !== payload?.product._id
      );

    case "ADD_TO_WISHLIST":
      console.log("wreducer", payload.updatedWishlist);
      return payload.updatedWishlist;

    default:
      return state;
  }
};

export { ReducerWishlist };
