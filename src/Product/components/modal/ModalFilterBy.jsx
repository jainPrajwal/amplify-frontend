import { brands, category, subcategory } from "../../../data/getItemsInStore";
import { useProducts } from "../../context/useProducts";
import { CheckboxBrand } from "../checkboxes/CheckboxBrand";
import { CheckboxCategory } from "../checkboxes/CheckboxCategory";
import { CheckboxSubCategory } from "../checkboxes/CheckboxSubCategory";

const ModalFilterBy = ({
  status: {
    state: { isFilterByModalOpen },
    dispatch: modalDispatch,
  },
}) => {
  const closeModal = () => {
    modalDispatch({ type: "CLOSE_MODAL" });
  };
  const { state: store, dispatch: storeDispatch } = useProducts();
  return (
    <div
      className={` ${
        isFilterByModalOpen === true ? "modal-bg modal-bg-active" : ""
      }`}
    >
      <div className="modal">
        <div className="modal-container">
          <span className="circle" style={{ bottom: "500px" }}>
            <span
              id="btn-modal-close"
              onClick={() => {
                closeModal();
              }}
            >
              ×
            </span>
          </span>

          <div className="modal-header">
            <div
              className="header header-tertiary text-black px-1"
              style={{ marginBottom: 0 }}
            >
              Sort By
            </div>
            <div
              className="red text-upper fs-2 clear-all"
              onClick={() => storeDispatch({ type: "CLEAR_ALL" })}
            >
              {" "}
              clear all
            </div>
          </div>
          <hr className="modal-hr" />
          <div className="modal-body">
            <div className="row">
              <ul className="category-list">
                <div className="text-primary fs-14 text-upper my-1">brands</div>
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
            </div>
            <div className="row">
              <ul className="category-list">
                <div className="text-primary fs-14 text-upper my-1">
                  categories
                </div>
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
            </div>
            <div className="row">
              <ul className="category-list">
                <div className="text-primary fs-14 text-upper my-1">
                  other categories
                </div>
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
            </div>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
};

export { ModalFilterBy };
