import { useSearchParams } from "react-router-dom";
import "./checkboxRegular.css";
const CheckboxSubCategory = ({
  value: { store, storeDispatch },
  subcategory,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <label className="checkbox-label checkboxRegular-label">
      <input
        type="checkbox"
        name={subcategory}
        checked={
          store.specificSubCategory
            .map((current) => {
              if (current.name === subcategory) return current.filterBy;
              return null;
            })
            .filter((item) => item !== null)[0]
        }
        onChange={(event) => {
          storeDispatch({
            type: "SUBCATEGORY",
            payload: [subcategory],
          });
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
    </label>
  );
};

export { CheckboxSubCategory };
