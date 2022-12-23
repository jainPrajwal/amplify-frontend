const CheckboxGreen = ({ state: { itemColor, setItemColor } }) => {
  
  return (
    <label className="checkbox-label  checkboxGreen-label">
      <input
        type="radio"
        name="itemColor"
        checked={itemColor === "green"}
        onChange={() => {
         
          setItemColor("green");
        }}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export { CheckboxGreen };
