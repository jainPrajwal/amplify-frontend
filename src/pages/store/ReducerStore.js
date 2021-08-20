import { getItemsInStore } from "../../data/getItemsInStore";

export const getSellingPriceForSeventyPercentDiscount = (price) => {
  return parseInt(price - (price / 100) * 70);
};

export const getSellingPriceForSave50 = (price) => {
  return parseInt(price - 50);
};

export const getSellingPriceForRepuublicDaySale = (price) => {
  return parseInt(price - 22);
};
const products = getItemsInStore().map((itemInStore) => {
  return {
    ...itemInStore,
    totalAvailableQuantity: itemInStore.availableColors.reduce(
      (acc, current) => {
        return (acc += current.maxQuantityOfItemInRespectiveColor);
      },
      0
    ),
  };
});

const updatedProducts = products.map((item) => {
  return {
    ...item,
    sellingPrice:
      item.offer === "70% bonanza"
        ? getSellingPriceForSeventyPercentDiscount(item.price)
        : item.offer === "Save 50"
        ? getSellingPriceForSave50(item.price)
        : getSellingPriceForRepuublicDaySale(item.price),
  };
});
const reducerCallbackFunction = (state, { type, payload }) => {
  switch (type) {
    case "LOAD_PRODUCTS":
      return { ...state, store: updatedProducts };

    case "SORT":
      return { ...state, sortBy: payload };

    default:
      return state;
  }
};
const initialState = {
  store: [],
  sortBy: "RECOMMENDED",
  fastDeliveryOnly: false,
  inStockOnly: false,
};
export { reducerCallbackFunction, initialState };
