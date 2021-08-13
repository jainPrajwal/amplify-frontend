const CheckboxWhite = ({ state: { color, setColor } }) => {
  return (
    <label className="checkbox-label  checkboxWhite-label">
      <input
        type="radio"
        name="color"
        checked={color === "white"}
        onChange={() => {
          console.log("setting color to white");
          setColor("white");
        }}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export { CheckboxWhite };
