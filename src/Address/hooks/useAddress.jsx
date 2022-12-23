import { useContext } from "react";
import { AddressContext } from "../context/address-context";

export const useAddress = () => {
  return useContext(AddressContext);
};
