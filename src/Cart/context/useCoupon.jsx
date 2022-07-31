import { useContext } from "react";
import { CouponContext } from "./coupon-context";

export const useCoupon = () => {
  return useContext(CouponContext);
};
