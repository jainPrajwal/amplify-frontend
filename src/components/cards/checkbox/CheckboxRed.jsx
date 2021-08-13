import { useState } from "react";

const CheckboxRed = ({ state: { color, setColor } }) => {
  return (
    <label className="checkbox-label  checkboxRed-label">
      <input
        type="radio"
        name="color"
        checked={color === "red"}
        onChange={() => {
          console.log("setting color to red");
          setColor("red");
        }}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export { CheckboxRed };
