import { useEffect } from "react";
import { useProducts } from "../../contexts/useProducts";
import { CardItemInStore } from "./CardItemInStore";

const getSortedData = (store, sortBy) => {
  console.log("get sorted data called", store);
  if (sortBy === "RECOMMENDED") return store;
  return [...store].sort((a, b) =>
    sortBy === "PRICE_HIGH_TO_LOW"
      ? b.sellingPrice - a.sellingPrice
      : a.sellingPrice - b.sellingPrice
  );
};

const CardProduct = () => {
  const {
    state: { store, sortBy, filterBy },
    dispatch,
  } = useProducts();
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "LOAD_PRODUCTS" });
    }, 3000);
  }, []);

  const sortedData = getSortedData(store, sortBy);

  // const filteredData = getFilteredData(sortedData, filterBy);

  return sortedData.map((product, index, store) => {
    return <CardItemInStore product={product} key={product.id} store={store} />;
  });
};

export { CardProduct };
