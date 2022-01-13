import axios from "axios";

const getSellingPriceForSeventyPercentDiscount = (price) => {
  return parseInt(price - (price / 100) * 70);
};

const getSellingPriceForSave50 = (price) => {
  return parseInt(price - 50);
};

const getSellingPriceForRepuublicDaySale = (price) => {
  return parseInt(price - 22);
};

const isItemOutOfStock = (item) => {
  return item.totalQuantity >= item.totalAvailableQuantity;
};

const isItemOutOfStockInRespectiveColor = (item) => {
  return item.availableColors.filter((colorObj) => {
    if (item.color === colorObj.color) {
      if (
        colorObj.quantityOfItemInRespectiveColor >=
        colorObj.maxQuantityOfItemInRespectiveColor
      ) {
        return true;
      } else return false;
    }
    return false;
  })[0];
};

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
    return itemInCart.productId === payload._id &&
      itemInCart.color === payload.color
      ? {
          ...increaseQuantityOfItemInRespectiveColor(payload),
        }
      : itemInCart;
  });
};

const decreaseQuantity = (state, payload) => {
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

const removeFromCart = (state, payload) => {
  return state?.filter((itemInCart) =>
    itemInCart.color === payload.color
      ? itemInCart._id !== payload._id
      : itemInCart
  );
};

const checkIfItemIsAlreadyPresentInArray = (state, product) => {
  return state.some((item) => {
    return item.productId == product._id;
  });
};

const checkIfItemIsAlreadyPresentInWishlist = (wishlist, item) => {
  const foundItem = {
    ...wishlist.find((itemInWishlist) => {
      return itemInWishlist.productId === item._id;
    }),
  };

  return foundItem;
};

const getSortedData = (store, sortBy) => {
  if (sortBy === "RECOMMENDED") return store;
  return [...store].sort((a, b) =>
    sortBy === "PRICE_HIGH_TO_LOW"
      ? b.sellingPrice - a.sellingPrice
      : a.sellingPrice - b.sellingPrice
  );
};

const getDataWithSpecificBrand = (store, specificBrand) => {
  const selectedBrands = specificBrand
    .map((item) => {
      if (item.filterBy === true) return item.name;
      return null;
    })
    .filter((item) => item !== null);
  if (selectedBrands.length <= 0) return store;
  return store.filter((product) => {
    return selectedBrands.includes(product.brand);
  });
};

const getDataWithSpecificCategory = (store, specificCategory) => {
  const selectedCategory = specificCategory
    .map((item) => {
      if (item.filterBy === true) return item.name;
      return null;
    })
    .filter((item) => item !== null);
  if (selectedCategory.length <= 0) return store;
  return store.filter((product) => {
    return selectedCategory.includes(product.category);
  });
};

const getDataWithSpecificSubCategory = (store, specificSubCategory) => {
  const selectedSubCategory = specificSubCategory
    .map((item) => {
      if (item.filterBy === true) return item.name;
      return null;
    })
    .filter((item) => item !== null);
  if (selectedSubCategory.length <= 0) return store;
  return store.filter((product) => {
    return selectedSubCategory.includes(product.subcategory);
  });
};

const getDataWithinAPriceRange = (store, maxRange) => {
  return store.filter((item) => item.sellingPrice <= maxRange);
};

const getQuantityOfItemInRespectiveColor = (itemInCart) => {
  const quantityOfItemInRespectiveColor = itemInCart.availableColors
    .map((colorObj) =>
      colorObj.color === itemInCart.color
        ? colorObj.quantityOfItemInRespectiveColor
        : null
    )
    .filter((colorObj) => colorObj != null)[0];
  console.log({ quantityOfItemInRespectiveColor });
};

const updateItemOnServer = async ({
  itemInCart,
  loggedInUser,
  cartDispatch,
  type,
  requiredUpdateInItem,
}) => {
  const response = await axios.post(
    `https://amplitude-backend.herokuapp.com/cart/${loggedInUser.userId}/${itemInCart._id}`,
    requiredUpdateInItem
  );

  const {
    data: { success, newCartItem },
  } = response;
  return success
    ? cartDispatch({
        type,
        payload: { newCartItem },
      })
    : null;
};

const getProductById = (store, id) => {
  const returnedObject = store.find((itemInStore) => {
    return itemInStore._id === id;
  });

  return returnedObject;
};

const checkIfItemIsAlreadyPresentInCartWithSameColor = (
  cart,
  product,
  itemColor
) => {
  return cart.some(
    (item) => item.productId === product._id && item.color === itemColor
  );
};

const addItemToWishlist = async (product, userId, wishlistDispatch) => {
  try {
    let productToBeWishlisted = { ...product };
    productToBeWishlisted["productId"] = product._id;
    delete productToBeWishlisted._id;
    const {
      data: { success, wishlist },
    } = await axios.post(
      `https://amplitude-backend.herokuapp.com/wishlist/${userId}`,
      productToBeWishlisted
    );

    if (success) {
      wishlistDispatch({
        type: "ADD_TO_WISHLIST",
        payload: { updatedWishlist: wishlist?.wishlistItems },
      });
    }
  } catch (error) {
    console.log("error", error?.response?.data?.errorMessage);
  }
};

const removeItemFromWishlist = async (product, userId, wishlistDispatch) => {
  try {
    const {
      data: { success },
    } = await axios.delete(
      `https://amplitude-backend.herokuapp.com/wishlist/${userId}/${product._id}`
    );
    if (success) {
      wishlistDispatch({
        type: "REMOVE_FROM_WISHLIST",
        payload: { product },
      });
    }
  } catch (error) {
    console.log("error", error?.response?.data?.errorMessage);
  }
};

export {
  getSellingPriceForSeventyPercentDiscount,
  getSellingPriceForSave50,
  getSellingPriceForRepuublicDaySale,
  isItemOutOfStock,
  isItemOutOfStockInRespectiveColor,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  checkIfItemIsAlreadyPresentInArray,
  checkIfItemIsAlreadyPresentInWishlist,
  getDataWithSpecificBrand,
  getDataWithSpecificCategory,
  getDataWithSpecificSubCategory,
  getDataWithinAPriceRange,
  getSortedData,
  getQuantityOfItemInRespectiveColor,
  updateItemOnServer,
  getProductById,
  checkIfItemIsAlreadyPresentInCartWithSameColor,
  addItemToWishlist,
  removeItemFromWishlist,
};
