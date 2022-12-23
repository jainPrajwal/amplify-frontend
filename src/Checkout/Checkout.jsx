import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { v4 } from "uuid";
import { Address } from "../Address/Address";
import { useAddress } from "../Address/hooks/useAddress";
import { SingleAddress } from "../Address/SingleAddress";
import { DELIVERY_CHARGES } from "../Cart/components/coupon/constants/constants";
import { getDiscountFromCoupon } from "../Cart/components/coupon/utils/getDiscountFromCoupon";
import { getTotal } from "../Cart/components/coupon/utils/getTotal";
import { useCart } from "../Cart/context/useCart";
import { useCoupon } from "../Cart/context/useCoupon";
import { BASE_API } from "../constants/api";
import { useNotifications } from "../Home/components/notification/context/useNotifications";

import { useOrders } from "../Payment/context/useOrders";
import { displayRazorPayModal } from "../Payment/displayRazorpayModal";

export const Checkout = () => {
  const { selectedAddress } = useAddress();
  const { setOrdersMeta } = useOrders();

  const { coupon, setCoupon } = useCoupon();
  const { dispatch: notificationDispatch } = useNotifications();

  const { state: cart, dispatch: cartDispatch } = useCart();

  const totalAfterCouponIsApplied = coupon?.isApplied
    ? getTotal(cart) - getDiscountFromCoupon(cart, coupon?.coupon)
    : getTotal(cart);
  const navigate = useNavigate();
  
  if (cart && cart.length > 0) {
    return (
      <>
        <div className="header header-secondary text-black text-center">
          Checkout
        </div>
        <div className="container-cart-details">
          <div className="wrapper-left-block">
            <Address />
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
                        return (acc +=
                          (current.price - current.sellingPrice) *
                          current.totalQuantity);
                      }, 0)
                    )}
                  </div>
                </div>
                <div className="itemCart-priceDetails-wrapper">
                  <div className="itemCart-discount-total-text">
                    Delivery Charges
                  </div>
                  <div className="itemCart-discount-total-price green">
                    ₹{DELIVERY_CHARGES}
                  </div>
                </div>
                {coupon && (
                  <div className="itemCart-priceDetails-wrapper">
                    <div className="itemCart-discount-total-text">
                      Coupon Discount
                    </div>
                    <div className="itemCart-discount-total-price green">
                      ₹{getDiscountFromCoupon(cart, coupon.coupon)}
                    </div>
                  </div>
                )}
                <hr className="my-1" />
                <div className="itemCart-priceDetails-wrapper text-primary">
                  <div className="itemCart-mrp-grand-total-text ">
                    Total Amount
                  </div>
                  <div className="itemCart-mrp-grand-total-price ">
                    ₹{totalAfterCouponIsApplied}
                  </div>
                </div>
              </div>

              <button
                className="btn btn-danger text-upper itemCart-checkout"
                onClick={async () => {
                  if (selectedAddress && selectedAddress?.address) {
                    displayRazorPayModal({
                      setOrdersMeta,
                      totalAmount: totalAfterCouponIsApplied,
                      navigate,
                      cartDispatch,
                      cart,
                      coupon,
                      setCoupon,
                    });
                  } else {
                    notificationDispatch({
                      type: "ADD_NOTIFICATION",
                      payload: {
                        id: v4(),
                        type: "DANGER",
                        message: `Please select address`,
                      },
                    });
                  }
                }}
              >
                {`Place Order`.toUpperCase()}
              </button>
            </div>
            <div className="my-lg">
              {selectedAddress&& selectedAddress.address && (
                <div className="itemCart-price-details">
                  <div className="header-tertiary text-black ">
                    Delivery Address
                  </div>

                  <div className="d-flex">
                    <SingleAddress
                      address={selectedAddress.address}
                      showIcons={false}
                     
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="d-flex f-direction-col ai-center jc-center">
      <div className="header header-secondary">Nothing to Checkout..!</div>
      <button className="btn btn-danger" onClick={() => navigate(`/store`)}>
        Explore Products
      </button>
    </div>
  );
};
