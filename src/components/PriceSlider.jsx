import { createRef, useEffect, useState } from "react";
import { useProducts } from "../contexts/useProducts";

const PriceSlider = () => {
  const slider = createRef();
  const silderValue = createRef();
  const [price, setPrice] = useState({
    priceInputValue: "1",
    priceInput: {
      0: "100",
      1: "500",
      2: "1000",
      3: "2000",
    },
  });
  useEffect(() => {
    slider.current.setAttribute("min", 0);

    slider.current.setAttribute(
      "max",
      Object.keys(price.priceInput).length - 1
    );
  }, [slider, price]);

  const { dispatch } = useProducts();
  const handlePriceChange = (event) => {
    setPrice((prevState) => ({
      ...prevState,
      priceInputValue: event.target.value,
    }));
    dispatch({
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
        min="0"
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
