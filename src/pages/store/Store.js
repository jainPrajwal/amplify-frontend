import { useReducer } from "react";
import { useEffect } from "react/cjs/react.development";

import { CardProduct } from "../../components";
import { ContainerEcommerce } from "../../components";
import { CheckboxBrand } from "../../components/cards/checkbox/CheckboxBrand";
import { CheckboxCategory } from "../../components/cards/checkbox/CheckboxCategory";
import { CheckboxSubCategory } from "../../components/cards/CheckboxSubCategory";
import { ModalFilterBy } from "../../components/modal/ModalFilterBy";
import { ModalSortBy } from "../../components/modal/ModalSortBy";

import { PriceSlider } from "../../components/PriceSlider";
import { SortByDesktop } from "../../components/SortByDesktop";
import { useProducts } from "../../contexts/useProducts";
import { brands, category, subcategory } from "../../data/getItemsInStore";

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


  return (
    <>
      <div className="d-flex jc-end mr-extra-large pr-large">
        <SortByDesktop />
      </div>
      <div className="grid-sidebar">
        <div className="container-sidebar-desktop">
          <div className="sidebar">
            <ul className="sidebar-list mt-extra-large px-1">
              <li className="sidebar-list-items mt-large">
                <div className="header fs-1 text-black text-upper d-flex jc-space-between">
                  <span>filter by</span>
                  <span
                    className="red fs-14 clear-all"
                    onClick={() => storeDispatch({ type: "CLEAR_ALL" })}
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
                      />{" "}
                      {brand}
                    </li>
                  ))}
                </ul>
              </li>
              <hr />
              <li className="sidebar-list-items  mt-large">
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
                      {category}
                    </li>
                  ))}
                </ul>
              </li>
              <hr />
              <li className="sidebar-list-items  mt-large">
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
                      {subcategory}
                    </li>
                  ))}
                </ul>
              </li>
              <hr />
              <li className="sidebar-list-items mt-large">
                <div className="header fs-1 text-black text-upper d-flex jc-space-between">
                  <span>select price range</span>
                </div>

                <PriceSlider value={{ store, storeDispatch }} />
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
      <div></div>
    </>
  );
};
export { Store };
