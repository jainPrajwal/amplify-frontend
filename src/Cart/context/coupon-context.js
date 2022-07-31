import { createContext, useState } from "react";

export const CouponContext = createContext();

export const CouponProvider = ({ children }) => {
  const [coupon, setCoupon] = useState(null);
  return (
    <CouponContext.Provider value={{ coupon, setCoupon }}>
      {children}
    </CouponContext.Provider>
  );
};

