import axios from "axios";
import { BASE_API } from "../constants/api";

import { loadScript } from "./loadScript";

export const displayRazorPayModal = async ({
  setOrdersMeta,
  totalAmount,
  navigate,
  cartDispatch,
  coupon,
  setCoupon,
  cart,
}) => {
  try {
    const response = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!response) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
  } catch (error) {
    console.error(
      `somehting went wrong while loading the razorpay script`,
      error
    );
  }
  try {
    const result = await axios.post(`${BASE_API}/payment`, {
      amount: totalAmount,
    });
    if (!result) {
      console.error(`result is undefined`, result);
    }

    const { amount, id: orderId, currency } = result.data.order;

    const options = {
      key: `rzp_test_qI8PEnrZgATDiP`,
      amount: amount.toString(),
      currency,
      name: `Amplify Lifestyle Pvt Ltd`,
      description: `test`,
      order_id: orderId,
      handler: async function (response) {
        const data = {
          orderCreationId: orderId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          orderedItems: cart,
        };

        try {
          const result = await axios.post(`${BASE_API}/payment/verify`, data);
          if (result.status === 201) {
            if (`payment` in result.data) {
             
              setOrdersMeta((prevState) => ({
                ...prevState,
                orders: prevState.orders.concat(result.data.payment),
              }));

              try {
                const { data, status } = await axios.delete(
                  `${BASE_API}/coupon/${coupon._id}`
                );

                if (status === 200) {
                  setCoupon(null);
                }
              } catch (error) {
                console.error(`error `, error);
              }
            }
          }
        } catch (error) {
          console.error(`error `, error);
        }

        try {
          const { data, status } = await axios.post(`${BASE_API}/cart/clear`);

          if (status === 201) {
            cartDispatch({
              type: "CLEAR_CART",
            });
          }
        } catch (error) {}

        navigate(`/orders/${orderId}`);
      },
      prefill: {
        name: "Amplify Lifestyle",
        email: "jainprajwal123@gmail.com",
        contact: "965726180",
      },
      notes: {
        address: "Amplify Lifestyle Corporate Office",
      },
      theme: {
        color: "#ff0044",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.error(`something went wrong while fetching payment details`, error);
  }
};
