import { useNavigate } from "react-router";
import { useProducts } from "../../../Product/context/useProducts";
import "./searchBar.css";

const getSearchedData = (store, searchQuery) => {
  const searchedProducts = store.filter((item) => {
    return item.name.toUpperCase().indexOf(searchQuery.toUpperCase()) > -1 ||
      item.brand.toUpperCase().indexOf(searchQuery.toUpperCase()) > -1
      ? true
      : false;
  });

  return searchedProducts;
};

const SearchBar = ({
  status: {
    mobileView: { isSearchBarHidden },
    setmobileView,
  },
}) => {
  const {
    state: { store, searchQuery },
    dispatch: storeDispatch,
  } = useProducts();
  const dataWithSearchedResults = getSearchedData(store, searchQuery);

  let navigate = useNavigate();

  return (
    <>
      <div className="autocomplete">
        <input
          type="text"
          className={`search-box`}
          placeholder="Search by name"
          onChange={(event) =>
            storeDispatch({ type: "SEARCH", payload: event.target.value })
          }
        />
        <div className="autocomplete-items">
          {searchQuery.length > 0 &&
            dataWithSearchedResults.map((item) => {
              return (
                <div
                  className="autocomplete-item"
                  onClick={() => {
                    navigate(`/products/${item._id}`);
                  }}
                  key={item._id}
                >
                  {`${item.name.substr(
                    0,
                    item.name.toUpperCase().indexOf(searchQuery.toUpperCase())
                  )}`}

                  <strong>
                    {`${item.name.substr(
                      item.name
                        .toUpperCase()
                        .indexOf(searchQuery.toUpperCase()),
                      item.name
                        .toUpperCase()
                        .indexOf(searchQuery.toUpperCase()) + searchQuery.length
                    )}`}
                  </strong>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export { SearchBar };
