import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import "./checkboxRegular.css";
const CheckboxCategory = ({ value: { store, storeDispatch }, category }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let isChecked = store.specificCategory
      .map((current) => {
        if (current.name === category) return current.filterBy;
        return null;
      })
      .filter((item) => item !== null)[0];
    if (isChecked) {
      searchParams.append(`category`, category);
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <label className="checkbox-label checkboxRegular-label">
      <input
        type="checkbox"
        name={category}
        checked={searchParams.getAll(`category`).includes(category)}
        onChange={(event) => {
          if (event.target.checked) {
            searchParams.append(`category`, category);
            setSearchParams(searchParams);
          } else {
            let newParams = [...searchParams.entries()].filter(
              ([key, value]) => {
                if (key === `category` && value === event.target.name) {
                  return null;
                } else return [key, value];
              }
            );

            setSearchParams(newParams);
          }
        }}
      />
      <span className="checkmark"></span>
      <div className="fs-1">{category}</div>
    </label>
  );
};

export { CheckboxCategory };
