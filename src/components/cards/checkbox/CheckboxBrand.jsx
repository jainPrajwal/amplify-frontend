const CheckboxBrand = ({ value: { store, storeDispatch }, brand }) => {
  return (
    <label className="checkbox-label checkboxRegular-label">
      <input
        type="checkbox"
        checked={
          store.specificBrand
            .map((current) => {
              if (current.name === brand) return current.filterBy;
              return null;
            })
            .filter((item) => item !== null)[0]
        }
        onChange={() => {
          storeDispatch({
            type: "BRAND",
            payload: brand,
          });
        }}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export { CheckboxBrand };
