import { getItemsInStore } from "../../data/getItemsInStore";

const reducerCallbackFunction = (state, action) => {
  switch (action.type) {
    case "LOAD_PRODUCTS":
      return { ...state, store: getItemsInStore() };
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
