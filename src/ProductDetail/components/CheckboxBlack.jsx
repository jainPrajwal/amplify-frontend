
const CheckboxBlack = ({ state: { itemColor, setItemColor } }) => {
  return (
    <label className="checkbox-label checkboxBlack-label">
      <input
        type="radio"
        name="itemColor"
        checked={itemColor === "black"}
        onChange={() => {
          
          setItemColor("black");
        }}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export { CheckboxBlack };
