const CheckboxBlue = ({ state: { color, setColor } }) => {
  console.log("color from blue", { color });
  return (
    <label className="checkbox-label checkboxBlue-label">
      <input
        type="radio"
        name="color"
        checked={color === "blue"}
        onChange={() => {
          console.log("setting color to blue");
          setColor("blue");
        }}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export { CheckboxBlue };
