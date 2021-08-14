const decreaseMaxQuantityOfItemInRespectiveColor = (product) => {
  return product.availableColors.map((colorObj) => {
    return colorObj.color === product.color
      ? {
          ...colorObj,
          maxQuantityOfItemInRespectiveColor:
            colorObj.maxQuantityOfItemInRespectiveColor - 1,
        }
      : colorObj;
  });
};

const increaseMaxQuantityOfItemInRespectiveColor = (product) => {
  return product.availableColors.map((colorObj) => {
    return colorObj.color === product.color
      ? {
          ...colorObj,
          maxQuantityOfItemInRespectiveColor:
            colorObj.maxQuantityOfItemInRespectiveColor + 1,
        }
      : colorObj;
  });
};

const getProductWithUpdatedQuantityMetrics = (
  product,
  updatedAvailableColors
) => {
  const updatedTotalQuantity = updatedAvailableColors.reduce((acc, current) => {
    return (acc += current.quantityOfItemInRespectiveColor);
  }, 0);

  return {
    ...product,
    availableColors: updatedAvailableColors,
    totalQuantity: updatedTotalQuantity,
  };
};
const increaseQuantityOfItemInRespectiveColor = (product) => {
  const Decreased_MaxQuantity_Of_Item_In_Respective_Color =
    decreaseMaxQuantityOfItemInRespectiveColor(product);

  const updatedArrayOfAvailableColors =
    Decreased_MaxQuantity_Of_Item_In_Respective_Color.map((colorObj) => {
      return colorObj.color === product.color
        ? {
            ...colorObj,
            quantityOfItemInRespectiveColor:
              colorObj.quantityOfItemInRespectiveColor + 1,
          }
        : colorObj;
    });

  return getProductWithUpdatedQuantityMetrics(
    product,
    updatedArrayOfAvailableColors
  );
};

const decreaseQuantityOfItemInRespectiveColor = (product) => {
  const Increased_MaxQuantity_Of_Item_In_Respective_Color =
    increaseMaxQuantityOfItemInRespectiveColor(product);

  const updatedArrayOfAvailableColors =
    Increased_MaxQuantity_Of_Item_In_Respective_Color.map((colorObj) => {
      return colorObj.color === product.color
        ? {
            ...colorObj,
            quantityOfItemInRespectiveColor:
              colorObj.quantityOfItemInRespectiveColor - 1,
          }
        : colorObj;
    });

  return getProductWithUpdatedQuantityMetrics(
    product,
    updatedArrayOfAvailableColors
  );
};

const increaseQuantity = (state, payload) => {
  return state.map((itemInCart) => {
    console.log(
      " itemInCart.id === payload.id && itemInCart.color === payload.color",
      itemInCart.id === payload.id && itemInCart.color === payload.color,
      "itemInCartId",
      itemInCart,
      "payloadId",
      payload.id,
      "itemInCart Color",
      itemInCart.color,
      "PAYLOAD COLOR ",
      payload.color
    );
    return itemInCart.id === payload.id && itemInCart.color === payload.color
      ? {
          ...increaseQuantityOfItemInRespectiveColor(payload),
        }
      : itemInCart;
  });
};

const decreaseQuantity = (state, payload) => {
  if (payload.totalQuantity > 1) {
    return state.map((itemInCart) =>
      itemInCart.id === payload.id && itemInCart.color === payload.color
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
      ? itemInCart.id !== payload.id
      : itemInCart
  );
};
const reducerCart = (state, { type, payload }) => {
  switch (type) {
    case "ADD_TO_CART":
      return increaseQuantity(state.concat(payload), payload);
    case "INCREASE_QUANTITY":
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
