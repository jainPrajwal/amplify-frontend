import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../context/useProducts";

const SortByDesktop = () => {
  const [isHidden, setIsHidden] = useState(true);
  const priceLowToHighRef = useRef();
  const priceHighToLowRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    state: { sortBy },
    dispatch: storeDispatch,
  } = useProducts();

  useEffect(() => {
    /*if (priceLowToHighRef?.current?.checked) {
      navigate({
        pathname: "/store",
        search: location?.search
          ? location.search.concat(`&&sortBy=PRICE_LOW_TO_HIGH`)
          : `?sortBy=PRICE_LOW_TO_HIGH`,
      });
    } else if (priceHighToLowRef?.current?.checked) {
      navigate({
        pathname: "/store",
        search: location?.search
          ? location.search.concat(`&&sortBy=PRICE_HIGH_TO_LOW`)
          : `?sortBy=PRICE_HIGH_TO_LOW`,
      });
    } else {
      // navigate({
      //   pathname: "/store",
      // });
    }*/
  }, [
    priceLowToHighRef?.current?.checked,
    priceHighToLowRef?.current?.checked,
  ]);
  return (
    <div
      className="sort-sortBy d-flex "
      onClick={() => setIsHidden((prevState) => !prevState)}
    >
      <div>
        sort By :
        <span className="text-primary ml-lg">
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
            ref={priceLowToHighRef}
            type="radio"
            name="sortBy"
            checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
            value={"PRICE_LOW_TO_HIGH"}
            onChange={() => {
              storeDispatch({
                type: "SORT",
                payload: "PRICE_LOW_TO_HIGH",
              });
              searchParams.set(`sortBy`, "PRICE_LOW_TO_HIGH");
              setSearchParams(searchParams);
              setIsHidden(true);
            }}
          />
          <span className="fs-14">Price Low To High</span>
          <span
            className={`checkmark ${
              sortBy === "PRICE_LOW_TO_HIGH" ? `checkmark-active` : ``
            }`}
          >
            <span></span>
          </span>
        </label>
        <label className="checkbox-label  checkboxRoundRadio-label">
          <input
            ref={priceHighToLowRef}
            type="radio"
            name="sortBy"
            checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
            value={"PRICE_HIGH_TO_LOW"}
            onChange={() => {
              storeDispatch({
                type: "SORT",
                payload: "PRICE_HIGH_TO_LOW",
              });
              searchParams.set(`sortBy`, "PRICE_HIGH_TO_LOW");
              setSearchParams(searchParams);
              setIsHidden(true);
            }}
          />
          <span className="fs-14"> Price High To Low</span>
          <span
            className={`checkmark ${
              sortBy === "PRICE_HIGH_TO_LOW" ? `checkmark-active` : ``
            }`}
          >
            <span></span>
          </span>
        </label>
        <label className="checkbox-label  checkboxRoundRadio-label">
          <input
            type="radio"
            name="sortBy"
            checked={sortBy && sortBy === "RECOMMENDED"}
            value={"RECOMMENDED"}
            onChange={() => {
              storeDispatch({
                type: "SORT",
                payload: "RECOMMENDED",
              });
              searchParams.set(`sortBy`, "RECOMMENDED");
              setSearchParams(searchParams);
              setIsHidden(true);
            }}
          />
          <span className="fs-14"> Recommended</span>
          <span
            className={`checkmark ${
              sortBy === "RECOMMENDED" ? `checkmark-active` : ``
            }`}
          >
            <span></span>
          </span>
        </label>
      </div>
    </div>
  );
};

export { SortByDesktop };
