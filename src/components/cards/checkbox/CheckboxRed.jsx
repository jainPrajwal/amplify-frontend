const CheckboxRed = ({ state: { itemColor, setItemColor } }) => {
  return (
    <label className="checkbox-label  checkboxRed-label">
      <input
        type="radio"
        name="itemColor"
        checked={itemColor && itemColor === "red"}
        onChange={() => {
          console.log("setting itemColor to red");
          setItemColor("red");
        }}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export { CheckboxRed };
