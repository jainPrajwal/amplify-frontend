import { useReducer } from "react";

import { CardProduct } from "../../components";
import { ContainerEcommerce } from "../../components";
import { Checkbox } from "../../components/cards/checkbox/Checkbox";
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

  return (
    <>
      <div
        className="header header-secondary text-center"
        style={{ color: "black" }}
      >
        Welcome to our Store!
        <div className="d-flex jc-end mr-extra-large pr-large">
          <SortByDesktop />
        </div>
      </div>
      <div className="grid-sidebar">
        <div className="container-sidebar-desktop">
          <div className="sidebar">
            <ul className="sidebar-list mt-extra-large px-1">
              <li className="sidebar-list-items mt-large">
                <div className="header fs-1 text-black text-upper d-flex jc-space-between">
                  <span>filter by</span>
                  <span className="red fs-14">clear all</span>
                </div>
                <hr />
                <div className="text-primary fs-14 text-upper my-1">brands</div>
                <ul className="category-list">
                  {brands.map((brand) => (
                    <li
                      key={brand}
                      className="category-list-item d-flex mt-small ai-center "
                    >
                      <Checkbox /> {brand}
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
                      <Checkbox /> {category}
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
                      <Checkbox /> {subcategory}
                    </li>
                  ))}
                </ul>
              </li>
              <hr />
              <li className="sidebar-list-items mt-large">
                <div className="header fs-1 text-black text-upper d-flex jc-space-between">
                  <span>select price range</span>
                </div>

                <PriceSlider />
              </li>
              <hr />
            </ul>
          </div>
        </div>
        <div className="container-main px-1">
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
            <button className="btn-secondary w-100 px-1 py-1">Filter By</button>
          </div>
        </div>
      </div>

      {state.isSortByModalOpen ? (
        <ModalSortBy status={{ state, dispatch }} />
      ) : (
        <div />
      )}
      <div></div>
    </>
  );
};
export { Store };
