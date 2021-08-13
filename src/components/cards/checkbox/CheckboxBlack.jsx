import { useState } from "react";

const CheckboxBlack = ({ state: { color, setColor } }) => {
  return (
    <label className="checkbox-label checkboxBlack-label">
      <input
        type="radio"
        name="color"
        checked={color === "black"}
        onChange={() => {
          console.log("setting color to black");
          setColor("black");
        }}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export { CheckboxBlack };
