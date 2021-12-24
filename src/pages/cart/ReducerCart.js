import {
  isItemOutOfStock,
  isItemOutOfStockInRespectiveColor,
} from "../store/ReducerStore";

const getProductWithUpdatedQuantityMetrics = (
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
const increaseQuantityOfItemInRespectiveColor = (product) => {
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

const decreaseQuantityOfItemInRespectiveColor = (product) => {
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

const increaseQuantity = (state, payload) => {
  return state.map((itemInCart) => {
    return itemInCart._id === payload._id && itemInCart.color === payload.color
      ? {
          ...increaseQuantityOfItemInRespectiveColor(payload),
        }
      : itemInCart;
  });
};

const decreaseQuantity = (state, payload) => {
  if (payload.totalQuantity > 1) {
    return state.map((itemInCart) =>
      itemInCart._id === payload._id && itemInCart.color === payload.color
        ? {
            ...itemInCart,
            ...decreaseQuantityOfItemInRespectiveColor(payload),
          }
        : itemInCart
    );
  }
  return removeFromCart(state, payload);
};

const removeFromCart = (state, payload) => {
  return state?.filter((itemInCart) =>
    itemInCart.color === payload.color
      ? itemInCart._id !== payload._id
      : itemInCart
  );
};
const reducerCart = (state, { type, payload }) => {
  switch (type) {
    case "ADD_TO_CART":
      return increaseQuantity(state.concat(payload), payload);
    case "INCREASE_QUANTITY":
      console.log("increasing quantity....");
      return increaseQuantity(state, payload);

    case "DECREASE_QUANTITY":
      return decreaseQuantity(state, payload);

    case "REMOVE_FROM_CART":
      return removeFromCart(state, payload);
    default:
      return state;
  }
};
export { reducerCart };
