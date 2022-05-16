import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { brands, category, subcategory } from "../data/getItemsInStore";
import { getDataWithSpecificBrand, getSortedData } from "../utils";
import { getSellingPrice } from "../utils/utils";
import { CardProduct } from "./components/cards/CardProduct";
import { CheckboxBrand } from "./components/checkboxes/CheckboxBrand";
import { CheckboxCategory } from "./components/checkboxes/CheckboxCategory";
import { CheckboxSubCategory } from "./components/checkboxes/CheckboxSubCategory";
import { ContainerEcommerce } from "./components/ContainerEcommerce";
import { ModalFilterBy } from "./components/modal/ModalFilterBy";
import { ModalSortBy } from "./components/modal/ModalSortBy";
import { PriceSlider } from "./components/priceslider/PriceSlider";
import { SortByDesktop } from "./components/SortByDesktop";
import { useProducts } from "./context/useProducts";
import "./product.css";

const modalReducer = (state, { type }) => {
  switch (type) {
    case "OPEN_SORTBY_BY_MODAL":
      return { ...state, isSortByModalOpen: true };
    case "OPEN_FILTER_BY_MODAL":
      return { ...state, isFilterByModalOpen: true };

    case "CLOSE_MODAL":
      return { ...state, isSortByModalOpen: false, isFilterByModalOpen: false };

    default:
      return state;
  }
};

const Store = () => {
  const [state, dispatch] = useReducer(modalReducer, {
    isSortByModalOpen: false,
    isFilterByModalOpen: false,
  });

  const { state: store, dispatch: storeDispatch } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    /*const searchString = location?.search.split("&&");
    console.log(`location`, location);
    if (store) {
      if (searchString.length > 1) {
        //multiple filters
        searchString.forEach((element, index) => {
          if (index === 0) {
            searchString[0] = searchString[0].slice(1);
            console.log(`searchString[o]`, searchString);
          }
          const searchParams = element.split("=");
          let [searchKey, searchValue] = searchParams;
          switch (searchKey) {
            case "filterBy":
              console.log(`store`, store);
              storeDispatch({
                type: "BRAND",
                payload: searchValue,
              });


              // setFinalData(prevState => {
              //   return prevState.length > 0 ? prevState.filter(product => product.brand === searchValue) : store?.store.filter(product => product.brand === searchValue)
              // })
           

              break;

            case "sortBy":
              // setFinalData(prevState => {
              //   return prevState.length > 0 ? getSortedData(prevState, searchValue) : getSortedData(store?.store, searchValue)
              // })
              storeDispatch({
                type: "SORT",
                payload: searchValue,
              });

              break;
            default:
              console.log("default case 12");
              // storeDispatch({
              //   type: "STATUS",
              //   payload: `idle`,
              // });
          }
        });
      } else {
        const searchParams = location?.search.split("=");
        searchParams[0] = searchParams[0].slice(1);
        const [searchKey, searchValue] = searchParams;
        switch (searchKey) {
          case "filterBy":
            storeDispatch({
              type: "BRAND",
              payload: searchValue,
            });
            break;

          case "sortBy":
            storeDispatch({
              type: "SORT",
              payload: searchValue,
            });

            break;
          default:
            console.log("default case 11!");
            storeDispatch({
              type: "STATUS",
              payload: `idle`,
            });
        }
      }
    } */

    const filters = {
      BRAND: searchParams.getAll(`brand`),
      CATEGORY: searchParams.getAll(`category`),
      SUBCATEGORY: searchParams.getAll(`subcategory`),
    };
    console.log(`only get`, searchParams.get(`brand`));
    const sortBy = searchParams.getAll(`sortBy`);
    const price = searchParams.get(`price`);
    console.log(`price`, price);

    const sortedData = getSortedData(store?.store, "PRICE_LOW_TO_HIGH");
    console.log(store, `store?.store in useEffect`);
    const itemWithMinimumPrice = getSellingPrice(sortedData[0]);

    const itemWithMaximumPrice = getSellingPrice(
      sortedData[sortedData.length - 1]
    );

    const priceInput = {
      0: itemWithMinimumPrice,
      1: Math.round(itemWithMaximumPrice / 2),
      2: Math.round((itemWithMinimumPrice + itemWithMaximumPrice) / 2),
      3: itemWithMaximumPrice,
    };

    let flag = false;
    console.log(`filters`, filters);
    for (let key in filters) {
      console.log(`flag as true here`, filters[key]);
      flag = true;
      storeDispatch({
        type: key,
        payload: filters[key],
      });
    }

    if (sortBy.length > 0) {
      flag = true;
      storeDispatch({
        type: `SORT`,
        payload: sortBy[0],
      });
    }

    if (price) {
      flag = true;
      storeDispatch({
        type: "PRICE_RANGE",
        payload: priceInput[price],
      });
    }

    // if(store.status === `loading`) {
    //   storeDispatch({type: `STATUS`, payload: `idle`})
    // }

    if (!flag) {
      console.log(`clearing all`);
      storeDispatch({
        type: `CLEAR_ALL`,
      });
    }
  }, [searchParams]);

  // useEffect(() => {
  //   if (searchParams.getAll(`brand`).length > 0) {
  //     console.log(`clearing all`);
  //     storeDispatch({
  //       type: `CLEAR_ALL`,
  //     });
  //   }
  // }, [searchParams]);

  console.log(`rendering stoire`, store);

  return (
    <>
      <div className="d-flex jc-end mr-lg pr-lg">
        <SortByDesktop />
      </div>
      <div className="grid-sidebar">
        <div className="container-sidebar-desktop">
          <div className="sidebar">
            <ul className="sidebar-list mt-lg px-1">
              <li className="sidebar-list-items mt-lg">
                <div className="header fs-1 text-black text-upper d-flex jc-space-between">
                  <span>filter by</span>
                  <span
                    className="red fs-14 clear-all"
                    onClick={() => {
                      navigate(`/${location.pathname}`);
                      storeDispatch({ type: "CLEAR_ALL" });
                    }}
                  >
                    clear all
                  </span>
                </div>
                <hr />
                <div className="text-primary fs-14 text-upper my-1">brands</div>
                <ul className="category-list">
                  {brands.map((brand) => (
                    <li
                      key={brand}
                      className="category-list-item d-flex mt-small ai-center "
                    >
                      <CheckboxBrand
                        value={{ store, storeDispatch }}
                        brand={brand}
                      />
                    </li>
                  ))}
                </ul>
              </li>
              <hr />
              <li className="sidebar-list-items  mt-lg">
                <div className="text-primary fs-14 text-upper my-1">
                  categories
                </div>
                <ul className="category-list">
                  {category.map((category) => (
                    <li
                      key={category}
                      className="category-list-item d-flex mt-small ai-center"
                    >
                      <CheckboxCategory
                        value={{ store, storeDispatch }}
                        category={category}
                      />
                    </li>
                  ))}
                </ul>
              </li>
              <hr />
              <li className="sidebar-list-items  mt-lg">
                <div className="text-primary fs-14 text-upper my-1">
                  other categories
                </div>
                <ul className="category-list">
                  {subcategory.map((subcategory) => (
                    <li
                      key={subcategory}
                      className="category-list-item d-flex mt-small ai-center"
                    >
                      <CheckboxSubCategory
                        value={{ store, storeDispatch }}
                        subcategory={subcategory}
                      />{" "}
                    </li>
                  ))}
                </ul>
              </li>
              <hr />
              <li className="sidebar-list-items mt-lg">
                <div className="header fs-1 text-black text-upper d-flex jc-space-between">
                  <span>select price range</span>
                </div>

                {store.store.length > 0 ? (
                  <PriceSlider value={{ store, storeDispatch }} />
                ) : (
                  `Loading..!`
                )}
              </li>
              <hr />
            </ul>
          </div>
        </div>
        <div className="container-main px-1">
          {/* <div className="text-left text-black">
            Total {store.store.length} items found..
          </div> */}
          <ContainerEcommerce>
            <CardProduct />
          </ContainerEcommerce>
        </div>
      </div>
      <div className="container-sortBy-mobile">
        <div className="wrapper-sortBy-mobile">
          <div>
            <button
              className="btn-secondary w-100 px-1 py-1"
              onClick={() => dispatch({ type: "OPEN_SORTBY_BY_MODAL" })}
            >
              Sort By
            </button>
          </div>
          <div>
            <button
              className="btn-secondary w-100 px-1 py-1"
              onClick={() => dispatch({ type: "OPEN_FILTER_BY_MODAL" })}
            >
              Filter By
            </button>
          </div>
        </div>
      </div>

      {state.isSortByModalOpen ? (
        <ModalSortBy status={{ state, dispatch }} />
      ) : (
        <div />
      )}

      {state.isFilterByModalOpen ? (
        <ModalFilterBy status={{ state, dispatch }} />
      ) : (
        <div />
      )}
    </>
  );
};
export { Store };
