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

export const isItemOutOfStock = (item) => {
  return item.totalQuantity >= item.totalAvailableQuantity - 1;
};

export const isItemOutOfStockInRespectiveColor = (item) => {
  return item.availableColors.filter((colorObj) => {
    if (item.color === colorObj.color) {
      if (
        colorObj.quantityOfItemInRespectiveColor >=
        colorObj.maxQuantityOfItemInRespectiveColor
      ) {
        console.log("out of stock", item);
        return true;
      } else return false;
    }
    return false;
  })[0];
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

const initialStateOfSpecificBrands = [
  {
    name: "Boat",
    filterBy: false,
  },
  {
    name: "OnePlus",
    filterBy: false,
  },
  {
    name: "Bose",
    filterBy: false,
  },
  {
    name: "Sony",
    filterBy: false,
  },
];
const initialStateOfSpecificCategories = [
  {
    name: "headphones",
    filterBy: false,
  },
  {
    name: "earphones",
    filterBy: false,
  },
  {
    name: "airbuds",
    filterBy: false,
  },
];
const initialStateOfSpecificSubCategories = [
  {
    name: "wired",
    filterBy: false,
  },
  {
    name: "wireless",
    filterBy: false,
  },
];
const reducerCallbackFunction = (state, { type, payload }) => {
  switch (type) {
    case "LOAD_PRODUCTS":
      return { ...state, store: updatedProducts };

    case "SORT":
      return { ...state, sortBy: payload };

    case "IN_STOCK_ONLY":
      return { ...state, inStockOnly: true };

    case "FAST_DELIVERY_ONLY":
      return { ...state, fastDeliveryOnly: true };

    case "BRAND":
      return {
        ...state,
        specificBrand: state.specificBrand.map((item) => {
          if (item.name === payload) {
            return { ...item, filterBy: !item.filterBy };
          }
          return item;
        }),
      };

    case "CATEGORY":
      return {
        ...state,
        specificCategory: state.specificCategory.map((item) => {
          if (item.name === payload) {
            return { ...item, filterBy: !item.filterBy };
          }
          return item;
        }),
      };

    case "SUBCATEGORY":
      return {
        ...state,
        specificSubCategory: state.specificSubCategory.map((item) => {
          if (item.name === payload) {
            return { ...item, filterBy: !item.filterBy };
          }
          return item;
        }),
      };

    case "PRICE_RANGE":
      console.log("price range", payload);
      return { ...state, maxRange: payload };

    case "SEARCH":
      return { ...state, searchQuery: payload };

    case "CLEAR_ALL":
      return {
        ...state,
        specificBrand: initialStateOfSpecificBrands,
        specificCategory: initialStateOfSpecificCategories,
        specificSubCategory: initialStateOfSpecificSubCategories,
      };

    case "STATUS":
      return { ...state, status: payload };
    default:
      return state;
  }
};
const initialState = {
  store: [],
  sortBy: "RECOMMENDED",
  fastDeliveryOnly: false,
  inStockOnly: false,
  specificBrand: initialStateOfSpecificBrands,
  specificCategory: initialStateOfSpecificCategories,
  specificSubCategory: initialStateOfSpecificSubCategories,
  maxRange: 20000,
  searchQuery: "",
  status: "idle",
};
export { reducerCallbackFunction, initialState };
