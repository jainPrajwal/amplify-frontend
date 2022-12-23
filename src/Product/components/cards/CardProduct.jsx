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
      return dataWithinAPriceRange.length > 0
        ? dataWithinAPriceRange.map((product, index, store) => {
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
