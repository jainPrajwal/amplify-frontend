import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAddress } from "../Address/hooks/useAddress";
import { SingleAddress } from "../Address/SingleAddress";
import { useAuth } from "../Auth/context/useAuth";
import { DELIVERY_CHARGES } from "../Cart/components/coupon/constants/constants";
import { getDiscountFromCoupon } from "../Cart/components/coupon/utils/getDiscountFromCoupon";
import { getTotal } from "../Cart/components/coupon/utils/getTotal";
import { useCart } from "../Cart/context/useCart";
import { useCoupon } from "../Cart/context/useCoupon";
import { BASE_API } from "../constants/api";
import { useOrders } from "../Payment/context/useOrders";

export const Orders = () => {
  const { selectedAddress } = useAddress();
  const { address } = selectedAddress;
  const { loggedInUser } = useAuth();
  const { coupon } = useCoupon();
  const { state: cart, dispatch: cartDispatch } = useCart();
  const navigate = useNavigate();

  const { ordersMeta, setOrdersMeta } = useOrders();
  
  const totalAfterCouponIsApplied =  coupon?.isApplied
    ? getTotal(cart) - getDiscountFromCoupon(cart, coupon?.coupon)
    : getTotal(cart);

  useEffect(() => {
    (async () => {
      if (loggedInUser?.token) {
        try {
          const { data, status } = await axios.get(`${BASE_API}/payment`);
          if (status === 200) {
            if (`payments` in data)
              setOrdersMeta((prevState) => ({
                ...prevState,
                orders: data.payments,
              }));
          }
        } catch (error) {}
      }
    })();
  }, [loggedInUser]);

  return (
    <>
      <div className="header header-secondary text-black text-center">
        Order Details
      </div>
      <div className="container-cart-details">
        <div className="wrapper-left-block">
          {ordersMeta &&
            ordersMeta.orders &&
            ordersMeta.orders.map((order) => {
              return (
                <div
                  className="d-flex ai-center"
                  key={order._id}
                  role={`button`}
                  onClick={() => navigate(`/orders/${order.order_id}`)}
                >
                  <div className="order-text-details">
                    <ul>
                      <li className="p-lg">
                        <span className="text-bold mr-sm">Order Id:</span>{" "}
                        <span>{order.order_id}</span>
                      </li>
                      <li className="p-lg">
                        <span className="text-bold mr-sm">Payment Id:</span>
                        <span>{order.payment_id}</span>
                      </li>
                      <li className="p-lg">
                        <span className="text-bold mr-sm">
                          Total Amount Paid:
                        </span>
                        <span>{totalAfterCouponIsApplied}</span>
                      </li>
                      <li></li>
                    </ul>
                  </div>

                  <div>
                    {order.items.map((item) => {
                      return (
                        <div className="maxW-220" key={item._id}>
                          <img
                            className="w-100"
                            src={`${item.image}`}
                            alt={`${item.name}`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="wrapper-right-block">
          <div style={{ marginBottom: `2rem` }}>
            <div className="itemCart-price-details">
              <div className="header-tertiary text-black ">Price Details</div>

              <div className="itemCart-priceDetails-wrapper">
                <div className="itemCart-mrp-total-text">Total MRP</div>
                <div className="itemCart-mrp-total-price">
                  ₹
                  {parseInt(
                    cart.reduce((acc, current) => {
                      return (acc += current.price * current.totalQuantity);
                    }, 0)
                  )}
                </div>
              </div>
              <div className="itemCart-priceDetails-wrapper">
                <div className="itemCart-discount-total-text">
                  Total Discount
                </div>
                <div className="itemCart-discount-total-price green">
                  ₹
                  {parseInt(
                    cart.reduce((acc, current) => {
                      return (acc += current.price - current.sellingPrice);
                    }, 0)
                  )}
                </div>
              </div>
              <div className="itemCart-priceDetails-wrapper">
                <div className="itemCart-discount-total-text">
                  Delivery Charges
                </div>
                <div className="itemCart-discount-total-price green">₹35</div>
              </div>
              <hr className="my-1" />
              <div className="itemCart-priceDetails-wrapper text-primary">
                <div className="itemCart-mrp-grand-total-text ">
                  Total Amount
                </div>
                <div className="itemCart-mrp-grand-total-price ">
                  ₹
                  {parseInt(
                    cart.reduce((acc, current) => {
                      return (acc +=
                        current.sellingPrice * current.totalQuantity);
                    }, 0) + 35
                  )}
                </div>
              </div>
            </div>

            <button
              className="btn btn-danger text-upper itemCart-checkout"
              onClick={() => {}}
            >
              {`Place Order`.toUpperCase()}
            </button>
          </div>
          <div className="my-lg">
            <div className="itemCart-price-details">
              <div className="header-tertiary text-black ">
                Delivery Address
              </div>

              <div className="d-flex">
                {selectedAddress.address && (
                  <SingleAddress
                    address={selectedAddress.address}
                    showIcons={false}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
