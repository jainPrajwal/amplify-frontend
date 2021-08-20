import { useEffect, useState } from "react";
import { useProducts } from "../contexts/useProducts";

const SortByDesktop = () => {
  const [isHidden, setIsHidden] = useState(true);

  const {
    state: { sortBy },
    dispatch: storeDispatch,
  } = useProducts();

  useEffect(() => {
    let timer = 0;
    if (!isHidden) {
      timer = setTimeout(() => setIsHidden(true), 5000);
    }
    return () => clearTimeout(timer);
  }, [isHidden]);
  return (
    <div className="sort-sortBy d-flex ">
      <div onClick={() => setIsHidden((prevState) => !prevState)}>
        sort By :
        <span className="text-primary ml-large">
          {sortBy === "PRICE_LOW_TO_HIGH"
            ? "PRICE LOW TO HIGH".toLowerCase()
            : sortBy === "PRICE_HIGH_TO_LOW"
            ? "PRICE HIGH TO LOW".toLowerCase()
            : "RECOMMENDED".toLowerCase()}
        </span>
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
              storeDispatch({
                type: "SORT",
                payload: "PRICE_LOW_TO_HIGH",
              });
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
              storeDispatch({
                type: "SORT",
                payload: "PRICE_HIGH_TO_LOW",
              });
            }}
          />
          <span className="fs-14"> Price High To Low</span>
          <span className="checkmark"></span>
        </label>
        <label className="checkbox-label  checkboxRoundRadio-label">
          <input
            type="radio"
            name="sortBy"
            checked={sortBy === "RECOMMENDED"}
            value={"RECOMMENDED"}
            onChange={() => {
              storeDispatch({
                type: "SORT",
                payload: "RECOMMENDED",
              });
            }}
          />
          <span className="fs-14"> Recommended</span>
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
};

export { SortByDesktop };
