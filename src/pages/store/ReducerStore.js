import { getItemsInStore } from "../../data/getItemsInStore";
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
const reducerCallbackFunction = (state, action) => {
  switch (action.type) {
    case "LOAD_PRODUCTS":
      return { ...state, store: products };
    default:
      return state;
  }
};
const initialState = {
  store: [],
  sortBy: "",
  fastDeliveryOnly: false,
  inStockOnly: false,
};
export { reducerCallbackFunction, initialState };
