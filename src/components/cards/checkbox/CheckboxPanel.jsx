import { useState } from "react";
import { useProducts } from "../../../contexts/useProducts";
import { CheckboxBlack } from "./CheckboxBlack";
import { CheckboxBlue } from "./CheckboxBlue";
import { CheckboxGreen } from "./CheckboxGreen";
import { CheckboxRed } from "./CheckboxRed";
import { CheckboxWhite } from "./CheckboxWhite";

const CheckboxPanel = ({ product }) => {
  console.log("product", product);
  const [color, setColor] = useState(product.color);

  return product.availableColors.map((colorObj) => {
    switch (colorObj.color) {
      case "blue":
        return (
          <span className="mr-medium" key={colorObj.colorId}>
            <CheckboxBlue state={{ color, setColor }} />
          </span>
        );

      case "red":
        return (
          <span className="mr-medium" key={colorObj.colorId}>
            <CheckboxRed state={{ color, setColor }} />
          </span>
        );

      case "black":
        return (
          <span className="mr-medium" key={colorObj.colorId}>
            {" "}
            <CheckboxBlack state={(color, setColor)} />
          </span>
        );
      case "white":
        return (
          <span className="mr-medium" key={colorObj.colorId}>
            {" "}
            <CheckboxWhite state={{ color, setColor }} />
          </span>
        );

      case "green":
        return (
          <span className="mr-medium" key={colorObj.colorId}>
            {" "}
            <CheckboxGreen state={{ color, setColor }} />
          </span>
        );

      default:
        return <div key={colorObj.colorId} />;
    }
  });
};

export { CheckboxPanel };
