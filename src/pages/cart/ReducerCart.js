import {
  isItemOutOfStock,
  isItemOutOfStockInRespectiveColor,
} from "../store/ReducerStore";

export const getProductWithUpdatedQuantityMetrics = (
  product,
  updatedAvailableColors
) => {
  const updatedTotalQuantity = updatedAvailableColors.reduce((acc, current) => {
    return (acc += current.quantityOfItemInRespectiveColor);
  }, 0);

  const updatedInStock = isItemOutOfStock(product);
  return {
    ...product,
    availableColors: updatedAvailableColors,
    totalQuantity: updatedTotalQuantity,
    inStock: !updatedInStock,
  };
};
export const increaseQuantityOfItemInRespectiveColor = (product) => {
  const updatedArrayOfAvailableColors = !isItemOutOfStockInRespectiveColor(
    product
  )
    ? product.availableColors.map((colorObj) => {
        return colorObj.color === product.color
          ? {
              ...colorObj,
              quantityOfItemInRespectiveColor:
                colorObj.quantityOfItemInRespectiveColor + 1,
            }
          : colorObj;
      })
    : product.availableColors;

  return getProductWithUpdatedQuantityMetrics(
    product,
    updatedArrayOfAvailableColors
  );
};

export const decreaseQuantityOfItemInRespectiveColor = (product) => {
  // const Increased_MaxQuantity_Of_Item_In_Respective_Color =
  //   increaseMaxQuantityOfItemInRespectiveColor(product);

  const updatedArrayOfAvailableColors = product.availableColors.map(
    (colorObj) => {
      return colorObj.color === product.color
        ? {
            ...colorObj,
            quantityOfItemInRespectiveColor:
              colorObj.quantityOfItemInRespectiveColor - 1,
          }
        : colorObj;
    }
  );

  return getProductWithUpdatedQuantityMetrics(
    product,
    updatedArrayOfAvailableColors
  );
};

export const increaseQuantity = (state, payload) => {
  return state.map((itemInCart) => {
    return itemInCart.productId === payload._id &&
      itemInCart.color === payload.color
      ? {
          ...increaseQuantityOfItemInRespectiveColor(payload),
        }
      : itemInCart;
  });
};

export const decreaseQuantity = (state, payload) => {
  if (payload.totalQuantity > 1) {
    return state.map((itemInCart) =>
      itemInCart.productId === payload._id && itemInCart.color === payload.color
        ? {
            ...itemInCart,
            ...decreaseQuantityOfItemInRespectiveColor(payload),
          }
        : itemInCart
    );
  }
  return removeFromCart(state, payload);
};

export const removeFromCart = (state, payload) => {
  return state?.filter((itemInCart) =>
    itemInCart.color === payload.color
      ? itemInCart._id !== payload._id
      : itemInCart
  );
};

const reducerCart = (state, { type, payload }) => {
  switch (type) {
    case "LOAD_CART":
      return payload?.cartItems;

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

    default:
      return state;
  }
};
export { reducerCart };
