import { COUPONS } from "../constants/constants";

export const selectRandomCoupon = () => {
    return COUPONS[Math.floor(Math.random() * COUPONS.length)];
  };
  