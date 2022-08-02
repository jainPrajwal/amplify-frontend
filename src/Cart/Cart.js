import { CardCart } from "./components/CardCart";
import { useCart } from "./context/useCart";
import "./components/cart.css";
import { useNavigate } from "react-router";
import { IoMdPricetags } from "react-icons/io";
import { useEffect, useState } from "react";
import { CouponModal } from "./components/coupon/CouponModal";
import { DELIVERY_CHARGES } from "./components/coupon/constants/constants";
import axios from "axios";
import { BASE_API } from "../constants/api";
import { getTotal } from "./components/coupon/utils/getTotal";
import { getDiscountFromCoupon } from "./components/coupon/utils/getDiscountFromCoupon";
import { useCoupon } from "./context/useCoupon";
import { useAuth } from "../Auth/context/useAuth";

const Cart = () => {
  const { state: cart } = useCart();
  const navigate = useNavigate();
  const [isCouponModalHidden, setisCouponModalHidden] = useState(true);
  const { coupon, setCoupon } = useCoupon();
  const [couponApplied, setIsCouponApplied] = useState(false);
  const { loggedInUser } = useAuth();

  const [status, setCouponStatus] = useState();

  const totalAfterCouponIsApplied =
    couponApplied || coupon?.isApplied
      ? getTotal(cart) - getDiscountFromCoupon(cart, coupon?.coupon)
      : getTotal(cart);

  useEffect(() => {
    (async () => {
      if (loggedInUser?.token) {
        try {
          const { data, status } = await axios.get(`${BASE_API}/coupon`);
          if (status === 200) {
            if (`coupon` in data) {
              setCoupon(data.coupon);
            }
          }
        } catch (error) {
          console.error(`error `, error);
        }
      }
    })();
  }, [loggedInUser]);

  if (cart.length > 0)
    return (
      <>
        {!isCouponModalHidden && (
          <CouponModal
            isCouponModalHidden={isCouponModalHidden}
            setisCouponModalHidden={setisCouponModalHidden}
            setCoupon={setCoupon}
          />
        )}
        <div className="header header-secondary text-black text-center">
          Your Cart
        </div>
        <div className="container-cart-details">
          <div className="wrapper-left-block">
            <div className="wrapper-offers">
              <div className="offers-content d-flex ai-center">
                <div className="offers-image-wrapper">
                  <img
                    src="https://img.icons8.com/cute-clipart/64/000000/discount.png"
                    className="w-100"
                    alt="offers"
                  />
                </div>
                <span className="text-primary ml-md">Available Offers</span>
              </div>
              <span className="text-gray text-smallest ">
                10% Instant Discount with ICICI Bank Credit and Debit Cards on a
                minimum spend of Rs 3,000. TCA
              </span>
            </div>

            <CardCart />
          </div>
          <div className="wrapper-right-block">
            <div className="itemCart-price-details">
              <div className="text-upper text-primary">price details</div>

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
              {coupon && (couponApplied || coupon.isApplied) && (
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
            {!coupon ? (
              <button
                className="btn btn-danger bg-transparent red w-100  d-flex  jc-center"
                style={{
                  border: `1px solid var(--kaali-danger)`,
                  marginBlock: `1rem`,
                }}
                onClick={() => setisCouponModalHidden(false)}
              >
                <div>
                  <IoMdPricetags size={16} />
                </div>
                <div className="ml-md"> Get Coupons</div>
              </button>
            ) : (
              !coupon?.isApplied && (
                <div className="d-flex ai-center jc-space-between f-wrap my-lg">
                  <div>{coupon.coupon}</div>

                  <button
                    disabled={status === `loading`}
                    className="btn btn-danger bg-transparent red d-flex  jc-center"
                    style={{
                      border: `1px solid var(--kaali-danger)`,
                      marginBlock: `1rem`,
                    }}
                    onClick={async () => {
                      setCouponStatus(`loading`);
                      try {
                        const { data, status } = await axios.post(
                          `${BASE_API}/coupon/${coupon._id}`
                        );

                        if (status === 201) {
                          setCouponStatus(`success`);
                          setIsCouponApplied(true);
                          setCoupon(data.coupon);
                        }
                      } catch (error) {
                        setCouponStatus(`error`);
                        console.error(`error `, error);
                      }
                    }}
                  >
                    <div>
                      <IoMdPricetags size={16} />
                    </div>
                    <div className="ml-md"> Apply Coupon</div>
                  </button>
                </div>
              )
            )}
            <button
              className="btn btn-danger text-upper w-100 mt-lg"
              onClick={() => {
                navigate(`/checkout`);
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </>
    );
  else
    return (
      <div className="d-flex f-direction-col jc-center ai-center">
        <div
          className="header header-secondary text-black text-center"
          style={{ whiteSpace: "normal" }}
        >
          Your Cart
        </div>

        <div className="d-flex f-direction-col gap-10">
          <div style={{ maxWidth: `220px`, margin: `0 auto` }} className="">
            <img
              src="https://res.cloudinary.com/dmk11fqw8/image/upload/v1659461512/undraw_no_data_re_kwbl_1_wlzwkm.svg"
              className="w-100"
              alt={`no data`}
            />
          </div>

          <div className="header-tertiary text-bold text-center my-lg">
            {" "}
            An empty cart doesn't look pretty! Nothing in cart..!
          </div>
        </div>
        <button className="btn btn-danger my-lg" onClick={() => navigate(`/store`)}>
          Explore Products
        </button>
      </div>
    );
};

export { Cart };
