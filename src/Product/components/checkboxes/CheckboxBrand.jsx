import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";

const CheckboxBrand = ({ value: { store, storeDispatch }, brand }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef?.current?.checked) {
      navigate({
        pathname: "/store",
        search: location?.search
          ? location.search.concat(`&&filterBy=${brand}`)
          : `?filterBy=${brand}`,
      });
    } else {
      navigate({
        pathname: "/store",
        search: location?.search.includes("&&")
          ? location.search.split("&&")[0]
          : ``,
      });
    }
  }, [inputRef?.current?.checked, brand, navigate]);
  return (
    <label className="checkbox-label checkboxRegular-label">
      <input
        type="checkbox"
        ref={inputRef}
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
