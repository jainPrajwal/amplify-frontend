const Checkbox = ({
  state: { itemColor, setItemColor, color, productOriginalColor },
}) => {
  const CapitalColor = `${color}`[0].toUpperCase() + `${color}`.slice(1);
  return (
    <label className={`checkbox-label checkbox${CapitalColor}-label`}>
      <input
        type="radio"
        name="itemColor"
        checked={itemColor === color}
        onChange={() => {
          setItemColor(color);
        }}
      />
      <span className="checkmark"></span>
    </label>
  );
};

const CheckboxPanel = ({
  product,
  colorObject: { itemColor, setItemColor },
}) => {
  return product.availableColors.map((colorObj) => {
    return (
      <div key={colorObj.color} className="d-flex gap-10">
        <Checkbox
          state={{
            itemColor,
            setItemColor,
            color: colorObj.color,
            productOriginalColor: product.color,
          }}
        />
      </div>
    );
  });
};

export { CheckboxPanel };
