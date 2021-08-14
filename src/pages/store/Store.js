import { useEffect, useState } from "react";
import { CardProduct } from "../../components";
import { ContainerEcommerce } from "../../components";
import { Checkbox } from "../../components/cards/checkbox/Checkbox";
import { CheckboxRed } from "../../components/cards/checkbox/CheckboxRed";

import { PriceSlider } from "../../components/PriceSlider";
import { brands, category, subcategory } from "../../data/getItemsInStore";

const Store = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [sortBy, setSortBy] = useState("RECOMMENDED");

  useEffect(() => {
    let timer = 0;
    if (!isHidden) {
      console.log("timeout ran");
      timer = setTimeout(() => setIsHidden(true), 5000);
    }
    return () => clearTimeout(timer);
  }, [isHidden]);
  return (
    <>
      <div
        className="header header-secondary text-center"
        style={{ color: "black" }}
      >
        Welcome to our Store!
        <div className="container-sort d-flex jc-end mr-extra-large pr-large">
          <div className="sort-sortBy d-flex ">
            <div onClick={() => setIsHidden((prevState) => !prevState)}>
              sort By :
              <span className="text-primary ml-large">Recommended</span>
            </div>

            <div
              className={`wrapper-sortBy-options ${
                isHidden ? "" : "wrapper-sortBy-options-active"
              }`}
            >
              <label className="checkbox-label  checkboxRoundRadio-label">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "PRICE_LOW_TO_HIGH"}
                  value={"PRICE_LOW_TO_HIGH"}
                  onChange={() => {
                    console.log("setting itemColor to red");
                    setSortBy("PRICE_LOW_TO_HIGH");
                  }}
                />
                <span className="fs-14">Price Low To High</span>
                <span className="checkmark"></span>
              </label>
              <label className="checkbox-label  checkboxRoundRadio-label">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "PRICE_HIGH_TO_LOW"}
                  value={"PRICE_HIGH_TO_LOW"}
                  onChange={() => {
                    console.log("setting itemColor to red");

                    setSortBy("PRICE_HIGH_TO_LOW");
                  }}
                />
                <span className="fs-14"> Price High To Low</span>
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
          <div></div>
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
    </>
  );
};
export { Store };
