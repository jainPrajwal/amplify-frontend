import "./checkboxRegular.css";
const CheckboxCategory = ({ value: { store, storeDispatch }, category }) => {
  return (
    <label className="checkbox-label checkboxRegular-label">
      <input
        type="checkbox"
        checked={
          store.specificCategory
            .map((current) => {
              if (current.name === category) return current.filterBy;
              return null;
            })
            .filter((item) => item !== null)[0]
        }
        onChange={() => {
          storeDispatch({
            type: "CATEGORY",
            payload: category,
          });
        }}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export { CheckboxCategory };
