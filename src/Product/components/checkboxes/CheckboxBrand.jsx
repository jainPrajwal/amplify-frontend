import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

import "./checkboxRegular.css";
const CheckboxBrand = ({ value: { store, storeDispatch }, brand }) => {
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <label className="checkbox-label checkboxRegular-label">
      <input
        type="checkbox"
        name={brand}
        checked={
          store.specificBrand
            .map((current) => {
              if (current.name === brand) return current.filterBy;
              return null;
            })
            .filter((item) => item !== null)[0]
        }
        onChange={(event) => {
          storeDispatch({
            type: "BRAND",
            payload: [brand],
          });

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
                if(key === `brand` && value === event.target.name) {
                  return null;
                } else return [key,value]
              }

            )

            // console.log(`newParams`, newParams)
            setSearchParams(newParams);

          }
        }}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export { CheckboxBrand };
