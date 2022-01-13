import { createRef, useEffect, useState } from "react";
import { useProducts } from "../contexts/useProducts";
import { getSortedData } from "../components/cards/CardProduct";

const PriceSlider = () => {
  const slider = createRef();
  const silderValue = createRef();
  const { state } = useProducts();

  const sortedData = getSortedData(state?.store, "PRICE_LOW_TO_HIGH");
  console.log({ sortedData });
  const itemWithMinimumPrice = sortedData[0]?.sellingPrice;

  console.log({ itemWithMinimumPrice });
  const itemWithMaximumPrice = sortedData[sortedData.length - 1]?.sellingPrice;
  const [price, setPrice] = useState({
    priceInputValue: "3",
    priceInput: {
      0: itemWithMinimumPrice,
      1: Math.round(itemWithMaximumPrice / 2),
      2: Math.round((itemWithMinimumPrice + itemWithMaximumPrice) / 2),
      3: itemWithMaximumPrice,
    },
  });

  useEffect(() => {
    slider.current.setAttribute("min", 0);

    slider.current.setAttribute(
      "max",
      Object.keys(price.priceInput).length - 1
    );
  }, [slider, price]);

  const { dispatch: storeDispatch } = useProducts();
  const handlePriceChange = (event) => {
    setPrice((prevState) => ({
      ...prevState,
      priceInputValue: event.target.value,
    }));
    storeDispatch({
      type: "PRICE_RANGE",
      payload: getPricingData(price.priceInput),
    });
  };

  const getPricingData = (obj) => {
    return slider.current === null
      ? obj[price.priceInputValue]
      : obj[slider.current.value];
  };

  return (
    <>
      <input
        type="range"
        min={itemWithMinimumPrice}
        defaultValue={price.priceInputValue}
        ref={slider}
        onChange={(event) => handlePriceChange(event)}
        className="slider"
      />
      <div ref={silderValue}>Value = {getPricingData(price.priceInput)}</div>
    </>
  );
};

export { PriceSlider };
