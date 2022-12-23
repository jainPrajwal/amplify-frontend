
const CheckboxWhite = ({ state: { itemColor, setItemColor } }) => {
  return (
    <label className="checkbox-label  checkboxWhite-label">
      <input
        type="radio"
        name="itemColor"
        checked={itemColor === "white"}
        onChange={() => {
          
          setItemColor("white");
        }}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export { CheckboxWhite };
