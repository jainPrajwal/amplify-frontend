import { useState } from "react";
import { CheckboxBlack } from "./CheckboxBlack";
import { CheckboxBlue } from "./CheckboxBlue";
import { CheckboxGreen } from "./CheckboxGreen";
import { CheckboxRed } from "./CheckboxRed";
import { CheckboxWhite } from "./CheckboxWhite";

const CheckboxPanel = ({
  product,
  colorObject: { itemColor, setItemColor },
}) => {
  return product.availableColors.map((colorObj) => {
    switch (colorObj.color) {
      case "blue":
        return (
          <span className="mr-medium" key={colorObj.colorId}>
            <CheckboxBlue state={{ itemColor, setItemColor }} />
          </span>
        );

      case "red":
        return (
          <span className="mr-medium" key={colorObj.colorId}>
            <CheckboxRed state={{ itemColor, setItemColor }} />
          </span>
        );

      case "black":
        return (
          <span className="mr-medium" key={colorObj.colorId}>
            {" "}
            <CheckboxBlack state={(itemColor, setItemColor)} />
          </span>
        );
      case "white":
        return (
          <span className="mr-medium" key={colorObj.colorId}>
            {" "}
            <CheckboxWhite state={{ itemColor, setItemColor }} />
          </span>
        );

      case "green":
        return (
          <span className="mr-medium" key={colorObj.colorId}>
            {" "}
            <CheckboxGreen state={{ itemColor, setItemColor }} />
          </span>
        );

      default:
        return <div key={colorObj.colorId} />;
    }
  });
};

export { CheckboxPanel };
