const CheckboxBlue = ({ state: { itemColor, setItemColor } }) => {
  return (
    <label className="checkbox-label checkboxBlue-label">
      <input
        type="radio"
        name="itemColor"
        checked={itemColor === "blue"}
        onChange={() => {
          setItemColor("blue");
        }}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export { CheckboxBlue };
