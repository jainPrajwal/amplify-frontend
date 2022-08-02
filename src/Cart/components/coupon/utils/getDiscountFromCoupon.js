import {
  AMPLIFY_25,
  AMPLIFY_50,
  AMPLIFY_70,
  DELIVERY_CHARGES,
} from "../constants/constants";
import { getTotal } from "./getTotal";

export const getDiscountFromCoupon = (cart, coupon) => {
  const result = getTotal(cart);

  switch (coupon) {
    case AMPLIFY_25:
      const resultAfterDiscount = result * 0.25;
      return parseInt(resultAfterDiscount, 10);

    case AMPLIFY_50:
      return parseInt(result * 0.5, 10);

    case AMPLIFY_70:
      return parseInt(result * 0.7, 10);

    default:
      
      return 0;
  }
};
