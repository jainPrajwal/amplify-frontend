import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "./checkboxRegular.css";
const CheckboxBrand = ({ value: { store }, brand }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    let isChecked = store.specificBrand
      .map((current) => {
        if (current.name === brand) return current.filterBy;
        return null;
      })
      .filter((item) => item !== null)[0];
    if (isChecked) {
      // console.log(`appending brand`, brand);
      // searchParams.append(`brand`, brand);
      // setSearchParams(searchParams);
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
              console.log(`on change setParams`);
              searchParams.append(`brand`, brand);
              setSearchParams(searchParams);
            } else {
              let newParams = [...searchParams.entries()].filter(
                ([key, value]) => {
                  if (key === `brand` && value === event.target.name) {
                    return null;
                  } else return [key, value];
                }
              );

              // console.log(`newParams`, newParams)
              if(newParams.length === 0) {
                navigate("/store");
              } else {
                setSearchParams(newParams);

              }
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
