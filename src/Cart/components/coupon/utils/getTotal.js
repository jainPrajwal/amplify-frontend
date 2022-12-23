import { DELIVERY_CHARGES } from "../constants/constants";

export const getTotal = (cart) =>
  parseInt(
    cart.reduce((acc, current) => {
      return (acc += current.sellingPrice * current.totalQuantity);
    }, 0)
  ) + DELIVERY_CHARGES;