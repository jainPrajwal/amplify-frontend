import { CardCart } from "../../components/cards/CardCart";
import { useCart } from "../../contexts/useCart";

const Cart = () => {
  let { state: cart, dispatch: cartDispatch } = useCart();
  if (cart.length > 0)
    return (
      <>
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
                <span className="text-primary ml-medium">Available Offers</span>
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
                <div className="itemCart-discount-total-price green">₹{0}</div>
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
                      return (acc += current.price * current.totalQuantity);
                    }, 0)
                  )}
                </div>
              </div>
            </div>

            <button className="btn btn-danger text-upper itemCart-buyNow">
              Buy now
            </button>
          </div>
        </div>
      </>
    );
  else
    return (
      <div className="header header-secondary text-black text-center">
        An empty cart doesn't look pretty!
      </div>
    );
};

export { Cart };
