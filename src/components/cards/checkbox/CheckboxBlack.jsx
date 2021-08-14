import { useState } from "react";

const CheckboxBlack = ({ state: { itemColor, setItemColor } }) => {
  return (
    <label className="checkbox-label checkboxBlack-label">
      <input
        type="radio"
        name="itemColor"
        checked={itemColor === "black"}
        onChange={() => {
          console.log("setting itemColor to black");
          setItemColor("black");
        }}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export { CheckboxBlack };
