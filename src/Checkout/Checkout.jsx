import { Address } from "../Address/Address";
import { useCart } from "../Cart/context/useCart";

export const Checkout = () => {
  const { state: cart } = useCart();
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
          <div className="itemCart-price-details">
            <div className="header header-tertiary text-black ">Price Details</div>

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
              <div className="itemCart-discount-total-text">Total Discount</div>
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
              <div className="itemCart-mrp-grand-total-text ">Total Amount</div>
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
      </div>
    </>
  );
};
