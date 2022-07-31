import { createContext, useState } from "react";

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [ordersMeta, setOrdersMeta] = useState({
    orders:[]
  });
  return (
    <OrdersContext.Provider value={{ ordersMeta, setOrdersMeta }}>
      {children}
    </OrdersContext.Provider>
  );
};
