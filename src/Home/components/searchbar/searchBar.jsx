import { useNavigate } from "react-router";

import { useProducts } from "../../../Product/context/useProducts";
import "./searchBar.css";
import { useState } from "react";
import { useEffect } from "react";
import { getSearchedData } from "../../../utils/utils";


const SearchBar = ({
  status: {
    mobileView,
    setMobileView,
  },
}) => {
  const {
    state: { store },
    dispatch: storeDispatch,
  } = useProducts();
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [timerId, setTimerId] = useState(null);
  const dataWithSearchedResults = getSearchedData(store, localSearchQuery);

  let navigate = useNavigate();
  

  return (
    <>
      <div className="autocomplete">
        <input
          type="text"
          className={`search-box`}
          value={localSearchQuery}
          placeholder="Search by name"
          onKeyUp={(e) => {
            if (e.key === `ArrowDown`) {
              [...e.target.nextElementSibling.children][0]?.focus();
            } else {
            }
          }}
          onChange={(event) => {
            
            setLocalSearchQuery(() => event.target.value);
            if (timerId) {
              
              clearTimeout(timerId);
            }

            setTimerId(
              setTimeout(() => {
                
                storeDispatch({ type: "SEARCH", payload: event.target.value });
              }, 1000)
            );
          }}
        />
        <div className="autocomplete-items">
          {localSearchQuery.length > 0 &&
            // showAutoSuggestions &&
            dataWithSearchedResults.map((item, index) => {
              let lowerCaseItemName = item.name.toLowerCase();
              let lowerCaseSearchQuery = localSearchQuery.toLowerCase();
              return (
                <div
                  className="autocomplete-item"
                  onClick={() => {
                    setMobileView(prevState => ({...prevState , isSearchBarHidden: true}))
                    navigate(`/products/${item._id}`);
                  }}
                  onKeyUp={(e) => {
                    if (index >= 0 && index < dataWithSearchedResults.length) {
                      if (e?.key === `Enter`) navigate(`/products/${item._id}`);
                      else if (e.key === `ArrowDown`) {
                        e.target?.nextElementSibling?.focus();
                      } else if (e?.key === `ArrowUp`) {
                        if (e.target?.previousElementSibling)
                          e.target?.previousElementSibling?.focus();
                        else {
                          e.target.parentNode.previousElementSibling.focus();
                        }
                      }
                    }
                  }}
                  key={item._id}
                  tabIndex={parseInt(index / 10, 10)}
                >
                  {`${lowerCaseItemName}`.slice(
                    0,
                    `${lowerCaseItemName}`.indexOf(`${lowerCaseSearchQuery}`)
                  )}
                  <strong>
                    {`${lowerCaseItemName}`.slice(
                      `${lowerCaseItemName}`.indexOf(`${lowerCaseSearchQuery}`),
                      `${lowerCaseItemName}`.indexOf(
                        `${lowerCaseSearchQuery}`
                      ) + `${lowerCaseItemName}`.length
                    )}
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
