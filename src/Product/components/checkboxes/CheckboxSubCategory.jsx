import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import "./checkboxRegular.css";
const CheckboxSubCategory = ({
  value: { store, storeDispatch },
  subcategory,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let isChecked = store.specificSubCategory
      .map((current) => {
        if (current.name === subcategory) return current.filterBy;
        return null;
      })
      .filter((item) => item !== null)[0];
    if (isChecked) {
      searchParams.append(`category`, subcategory);
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <label className="checkbox-label checkboxRegular-label">
      <input
        type="checkbox"
        name={subcategory}
        checked={searchParams.getAll(`subcategory`).includes(subcategory)}
        onChange={(event) => {
          // storeDispatch({
          //   type: "SUBCATEGORY",
          //   payload: [subcategory],
          // });
          if (event.target.checked) {
            searchParams.append(`subcategory`, subcategory);
            setSearchParams(searchParams);
          } else {
            let newParams = [...searchParams.entries()].filter(
              ([key, value]) => {
                if (key === `subcategory` && value === event.target.name) {
                  return null;
                } else return [key, value];
              }
            );

            setSearchParams(newParams);
          }
        }}
      />
      <span className="checkmark"></span>
      <div className="fs-1">{subcategory}</div>
    </label>
  );
};

export { CheckboxSubCategory };
