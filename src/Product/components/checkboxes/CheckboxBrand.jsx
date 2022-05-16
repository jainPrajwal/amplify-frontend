import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

import "./checkboxRegular.css";
const CheckboxBrand = ({ value: { store, storeDispatch }, brand }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    let isChecked = store.specificBrand
      .map((current) => {
        if (current.name === brand) return current.filterBy;
        return null;
      })
      .filter((item) => item !== null)[0];
    if (isChecked) {
      searchParams.append(`brand`, brand);
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <>
      <label className="checkbox-label checkboxRegular-label">
        <input
          type="checkbox"
          name={brand}
          checked={searchParams.getAll(`brand`).includes(brand)}
          onChange={(event) => {
            if (event.target.checked) {
              // navigate({
              //   pathname: "/store",
              //   search: location?.search
              //     ? location.search.concat(`&&filterBy=${brand}`)
              //     : `?filterBy=${brand}`,
              // });
              searchParams.append(`brand`, brand);
              setSearchParams(searchParams);
            } else {
              // navigate({
              //   pathname: "/store",
              //   search: location?.search.includes("&&") ? location.search : ``,
              // });

              let newParams = [...searchParams.entries()].filter(
                ([key, value]) => {
                  if (key === `brand` && value === event.target.name) {
                    return null;
                  } else return [key, value];
                }
              );

              // console.log(`newParams`, newParams)
              setSearchParams(newParams);
            }
          }}
        />

        <span className="checkmark"></span>
        <div className="fs-1">{brand}</div>
      </label>
    </>
  );
};

export { CheckboxBrand };
