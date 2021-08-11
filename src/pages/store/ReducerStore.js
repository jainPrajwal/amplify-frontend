import { getItemsInStore } from "../../data/getItemsInStore";
const products = getItemsInStore();
const reducerCallbackFunction = (state, action) => {
  switch (action.type) {
    case "LOAD_PRODUCTS":
      console.log("load products called");
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
