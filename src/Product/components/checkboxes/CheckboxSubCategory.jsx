import "./checkboxRegular.css";
const CheckboxSubCategory = ({
  value: { store, storeDispatch },
  subcategory,
}) => {
  return (
    <label className="checkbox-label checkboxRegular-label">
      <input
        type="checkbox"
        checked={
          store.specificSubCategory
            .map((current) => {
              if (current.name === subcategory) return current.filterBy;
              return null;
            })
            .filter((item) => item !== null)[0]
        }
        onChange={() => {
          storeDispatch({
            type: "SUBCATEGORY",
            payload: subcategory,
          });
        }}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export { CheckboxSubCategory };
