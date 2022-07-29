import { useProducts } from "../../context/useProducts";
import { CardItemInStore } from "./CardItemInStore";
import loadingImage from "../../../assets/images/loading.gif";
import {
  getDataWithinAPriceRange,
  getDataWithSpecificBrand,
  getDataWithSpecificCategory,
  getDataWithSpecificSubCategory,
  getSortedData,
} from "../../../utils";
import { getSearchedData } from "../../../utils/utils";

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
      searchQuery,
    },
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

  const dataWithSearchedResults = getSearchedData(dataWithinAPriceRange, searchQuery);

  switch (status) {
    case "idle":
      return dataWithSearchedResults.length > 0
        ? dataWithSearchedResults.map((product, index, store) => {
            return (
              <CardItemInStore
                product={product}
                key={product._id}
                store={store}
              />
            );
          })
        : `No items found!`;
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
