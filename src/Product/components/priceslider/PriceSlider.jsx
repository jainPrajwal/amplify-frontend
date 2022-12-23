import { createRef, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSortedData } from "../../../utils";
import { getSellingPrice } from "../../../utils/utils";
import { useProducts } from "../../context/useProducts";
import "./priceslider.css";

const PriceSlider = () => {
  const slider = createRef();

  const { state } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortedData = getSortedData(state?.store, "PRICE_LOW_TO_HIGH");

  const itemWithMinimumPrice = getSellingPrice(sortedData[0]);

  const itemWithMaximumPrice = getSellingPrice(
    sortedData[sortedData.length - 1]
  );
  const [price, setPrice] = useState({
    priceInputValue: searchParams.get(`price`) ?? "3",
    priceInput: {
      0: itemWithMinimumPrice,
      1: Math.round(itemWithMaximumPrice / 2),
      2: Math.round((itemWithMinimumPrice + itemWithMaximumPrice) / 2),
      3: itemWithMaximumPrice,
    },
  });
  const getPricingData = (obj) => {
    return slider.current === null
      ? obj[price.priceInputValue]
      : obj[slider.current.value];
  };

  useEffect(() => {
    slider.current.setAttribute("min", 0);

    slider.current.setAttribute(
      "max",
      Object.keys(price.priceInput).length - 1
    );
  }, [slider, price]);

  const { dispatch: storeDispatch } = useProducts();

  const handlePriceChange = (event) => {
    searchParams.set(`price`, event.target.value);
    setSearchParams(searchParams);
    setPrice((prevState) => {
      return {
        ...prevState,
        priceInputValue: event.target.value,
      };
    });
    storeDispatch({
      type: "PRICE_RANGE",
      payload: getPricingData(price.priceInput),
    });
  };

  useEffect(() => {
    setPrice((prevState) => {
      return {
        ...prevState,
        priceInputValue: searchParams.get(`price`) || 3,
      };
    });
  }, [searchParams]);

  return (
    <>
      <input
        type="range"
        min={itemWithMinimumPrice}
        value={price.priceInputValue}
        ref={slider}
        onChange={(event) => handlePriceChange(event)}
        className="slider"
      />
      <div className="my-lg">Upto ₹{getPricingData(price.priceInput)}</div>
    </>
  );
};

export { PriceSlider };
