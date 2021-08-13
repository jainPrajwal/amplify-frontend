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

const increaseTotalQuantity = (product, updatedAvailableColors) => {
  console.log(
    "increase Total Quantity",
    updatedAvailableColors.reduce((acc, current) => {
      console.log("acc", acc);
      return (acc += current.quantityOfItemInRespectiveColor);
    }, 0)
  );
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
  const decreased_MaxQuantity_Of_Item_In_Respective_Color =
    decreaseMaxQuantityOfItemInRespectiveColor(product);
  console.log(
    "kya hai ye sab",
    decreased_MaxQuantity_Of_Item_In_Respective_Color[0]
  );

  const updatedArrayOfAvailableColors =
    decreased_MaxQuantity_Of_Item_In_Respective_Color.map((colorObj) => {
      return colorObj.color === product.color
        ? {
            ...colorObj,
            quantityOfItemInRespectiveColor:
              colorObj.quantityOfItemInRespectiveColor + 1,
          }
        : colorObj;
    });
  console.log(
    "increaseTotalQuantity(product, updatedArrayOfAvailableColors)",
    increaseTotalQuantity(product, updatedArrayOfAvailableColors)
  );
  return increaseTotalQuantity(product, updatedArrayOfAvailableColors);
};

const decreaseQuantityOfItemInRespectiveColor = (product) => {
  return product.availableColors.map((colorObj) => {
    return colorObj.color === product.color
      ? {
          ...colorObj,
          quantityOfItemInRespectiveColor:
            colorObj.quantityOfItemInRespectiveColor - 1,
        }
      : colorObj;
  });
};

// const updateTotalQuantity = (product) => {
//   return product.availableColors.reduce((acc, current) => {
//     return (acc += current.quantityOfItemInRespectiveColor);
//   }, 0);
// };

const increaseQuantity = (state, payload) => {
  console.log(
    "return of ...increaseQuantityOfItemInRespectiveColor(payload)",
    increaseQuantityOfItemInRespectiveColor(payload)
  );
  return state.map((itemInCart) =>
    itemInCart.id === payload.id
      ? {
          ...itemInCart,
          ...increaseQuantityOfItemInRespectiveColor(payload),
        }
      : itemInCart
  );
};

const decreaseQuantity = (state, payload) => {
  if (payload.quantity > 1) {
    return state.map((itemInCart) =>
      itemInCart.id === payload.id
        ? {
            ...itemInCart,
            quantity: itemInCart.quantity - 1,
          }
        : itemInCart
    );
  }
  return removeFromCart(state, payload);
};

const removeFromCart = (state, payload) => {
  return state?.filter((itemInCart) => itemInCart.id !== payload.id);
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
