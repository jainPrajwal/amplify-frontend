import { useState } from "react";

const Checkbox = (props) => {
  const [isChecked, setIsChecked] = useState(true);

  const toggleValue = () => {
    setIsChecked((prevState) => !prevState);
  };
  return (
    <label className="checkbox-label checkboxRegular-label">
      {props.brand}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => toggleValue()}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export { Checkbox };
