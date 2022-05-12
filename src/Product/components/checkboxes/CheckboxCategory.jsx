import { useSearchParams } from "react-router-dom";
import "./checkboxRegular.css";
const CheckboxCategory = ({ value: { store, storeDispatch }, category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <label className="checkbox-label checkboxRegular-label">
      <input
        type="checkbox"
        name={category}
        checked={
          store.specificCategory
            .map((current) => {
              if (current.name === category) return current.filterBy;
              return null;
            })
            .filter((item) => item !== null)[0]
        }
        onChange={(event) => {
          storeDispatch({
            type: "CATEGORY",
            payload: [category],
          });
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
    </label>
  );
};

export { CheckboxCategory };
