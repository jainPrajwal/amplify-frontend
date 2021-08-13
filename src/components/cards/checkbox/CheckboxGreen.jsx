import { useState } from "react";

const CheckboxGreen = ({ state: { color, setColor } }) => {
  console.log("color from green", { color });
  return (
    <label className="checkbox-label  checkboxGreen-label">
      <input
        type="radio"
        name="color"
        checked={color === "green"}
        onChange={() => {
          console.log("setting color to green");
          setColor("green");
        }}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export { CheckboxGreen };
