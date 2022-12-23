import axios, { AxiosResponse } from "axios";
import { BASE_API } from "../constants/api";



export const getPaymentDetailsService = async () => {
  try {
    const response = await axios.get(`${BASE_API}/payment`);
    return response;
  } catch (error) {
    console.error(
      `somehting wemt wronh while fetching the payment details`,
      error
    );
    
  }
};
