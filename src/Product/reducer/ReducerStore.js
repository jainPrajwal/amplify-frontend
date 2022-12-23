import {
  getSellingPriceForRepuublicDaySale,
  getSellingPriceForSave50,
  getSellingPriceForSeventyPercentDiscount,
} from "../../utils";

const sanitizeProducts = (products) => {
  const newProducts = products.map((itemInStore) => {
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

  const updatedProducts = newProducts.map((item) => {
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

  return updatedProducts;
};

const initialStateOfSpecificBrands = [
  {
    name: "Boat",
    filterBy: false,
  },
  {
    name: "Apple",
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
      const products = sanitizeProducts(payload.products);

      return { ...state, store: products };

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
          if (payload.includes(item.name)) {
            return { ...item, filterBy: true };
          }
          return { ...item, filterBy: false };
        }),
      };

    case "CATEGORY":
      return {
        ...state,
        specificCategory: state.specificCategory.map((item) => {
          if (payload.includes(item.name)) {
            return { ...item, filterBy: true };
          }
           return { ...item, filterBy: false };
        }),
      };

    case "SUBCATEGORY":
      return {
        ...state,
        specificSubCategory: state.specificSubCategory.map((item) => {
          if (payload.includes(item.name)) {
            return { ...item, filterBy: true };
          }
           return { ...item, filterBy: false };
        }),
      };

    case "PRICE_RANGE":
      return { ...state, maxRange: payload };

    case "SEARCH":
      return { ...state, searchQuery: payload };

    case "CLEAR_ALL":
      return {
        ...initialState,
        store: state.store,
        
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
