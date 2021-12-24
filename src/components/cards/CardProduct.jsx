
import { useProducts } from "../../contexts/useProducts";
import { CardItemInStore } from "./CardItemInStore";
import loadingImage from "../../assets/images/loading.gif";

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

const CardProduct = () => {
  const {
    state: {
      store,
      sortBy,
      specificBrand,
      specificCategory,
      specificSubCategory,
      maxRange,
      status,
    },
    dispatch: storeDispatch,
  } = useProducts();


  const sortedData = getSortedData(store, sortBy);

  const dataWithSpecificBrand = getDataWithSpecificBrand(
    sortedData,
    specificBrand
  );

  const dataWithSpecificCategory = getDataWithSpecificCategory(
    dataWithSpecificBrand,
    specificCategory
  );

  const dataWithSpecificSubCategory = getDataWithSpecificSubCategory(
    dataWithSpecificCategory,
    specificSubCategory
  );

  const dataWithinAPriceRange = getDataWithinAPriceRange(
    dataWithSpecificSubCategory,
    maxRange
  );

  switch (status) {
    case "idle":
      return dataWithinAPriceRange.map((product, index, store) => {
        return (
          <CardItemInStore product={product} key={product._id} store={store} />
        );
      });
    case "loading":
      return (
        <div className="wrapper-loading">
          <img src={loadingImage} className="w-100 h-auto" alt="loading" />
        </div>
      );

    case "error":
      return (
        <h1>
          opps it seems there was some error!Please try again after some time
        </h1>
      );

    default:
      return <div />;
  }
};

export { CardProduct };
