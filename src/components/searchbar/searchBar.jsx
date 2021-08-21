import { useNavigate } from "react-router";
import { useProducts } from "../../contexts/useProducts";

const getSearchedData = (store, searchQuery) => {
  return store.filter((item) => {
    return item.name.toUpperCase().indexOf(searchQuery.toUpperCase()) > -1 ||
      item.brand.toUpperCase().indexOf(searchQuery.toUpperCase()) > -1
      ? true
      : false;
  });
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
                <>
                  <div
                    onClick={() => {
                      navigate(`/products/${item.id}`);
                      storeDispatch({
                        type: "SEARCH",
                        payload: "",
                      });
                    }}
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
                          .indexOf(searchQuery.toUpperCase()) +
                          searchQuery.length
                      )}`}
                    </strong>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export { SearchBar };
