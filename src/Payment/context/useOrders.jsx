import { useContext } from "react";
import { OrdersContext } from "./orders-context";


export const useOrders = () => {
  return useContext(OrdersContext);
};
