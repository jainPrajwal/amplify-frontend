import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { v4 } from "uuid";
import { useCart } from "../../contexts/useCart";

import { useNotifications } from "../../contexts/useNotifications";
import { useProducts } from "../../contexts/useProducts";
import { useWishlist } from "../../contexts/useWishlist";
import { isItemOutOfStockInRespectiveColor } from "../../pages/store/ReducerStore";
import { checkIfItemIsAlreadyPresentInArray } from "../../pages/wishlist/ReducerWishlist";
import { CheckboxPanel } from "./checkbox/CheckboxPanel";

const CardItemDetails = () => {
  let { productId } = useParams();
  const { state: wishlist, dispatch: wishlistDispatch } = useWishlist();

  const { dispatch: notificationDispatch } = useNotifications();
  let navigate = useNavigate();
  const { state } = useProducts();
  const { state: cart, dispatch: cartDispatch } = useCart();

  const getProductById = (id) => {
    return state.store.find((itemInCart) => itemInCart.id === id);
  };

  let { id, name, image, brand, category, subcategory, offer, price } =
    getProductById(productId);
  let product = getProductById(id);
  const [itemColor, setItemColor] = useState(product.color);
  const IsAlreadyPresentInArray = checkIfItemIsAlreadyPresentInArray(
    wishlist,
    product
  );
  const checkIfItemIsAlreadyPresentInCartWithSameColor = (cart, product) => {
    return cart.some(
      (item) => item.id === product.id && item.color === itemColor
    );
  };
  const IsAlreadyPresentInCart = checkIfItemIsAlreadyPresentInCartWithSameColor(
    cart,
    product
  );
  return (
    <>
      <div className="card-image-wrapper">
        <img src={image} className="card-image-ecommerce" alt={name} />
      </div>
      <div className="card-content-ecommerce-product-details">
        <div className="card-title header header-secondary text-black">
          <span>{brand}</span>
        </div>
        <div>
          <span className="card-subtitle text-gray fs-3 ">{category}</span>
          <span className="card-subtitle text-gray fs-2 ml-small">
            ({subcategory})
          </span>
        </div>

        <div className="ratings-cart mt-medium">
          <div className="badge-rating ">
            4.7
            <i
              className="fas fa-star text-white ml-small"
              style={{ fontSize: "small" }}
            ></i>
            <span className="text-white">
              <span className="text-white mx-1">|</span>
              <span className="text-white ">20 Ratings</span>
            </span>
          </div>
        </div>

        <div className="product-price-details-in-cart mt-extra-large">
          <div className="product-price">
            <span className="header header-tertiary text-black">
              ₹
              {`${
                offer === "70% bonanza"
                  ? parseInt(price - (price / 100) * 70)
                  : offer === "Save 50"
                  ? parseInt(price - 50)
                  : parseInt(price - 22)
              }`}
            </span>
            <span className="product-selling-price ml-medium  fs-2">
              ₹{price}
            </span>
            <span className="product-discount fs-2 ml-medium">({offer})</span>
            <div className="text-primary green fs-14">
              inclusive of all taxes
            </div>
          </div>
        </div>

        <div className="text-primary text-black mt-extra-large">
          {`${`select Color`.toUpperCase()}`}
          <div className="d-flex mt-medium color-palette">
            <CheckboxPanel
              product={product}
              key={id}
              colorObject={{ itemColor, setItemColor }}
            />
          </div>{" "}
        </div>

        <div className="btn-outer-wrapper-prod-detail mt-extra-large">
          <div className="btn-wrapper-prod-detail">
            {!IsAlreadyPresentInCart ? (
              <button
                className="btn btn-danger primary-add-to"
                disabled={isItemOutOfStockInRespectiveColor(product)}
                onClick={() => {
                  console.log("IsAlreadyPresentInCart", IsAlreadyPresentInCart);

                  !IsAlreadyPresentInCart
                    ? cartDispatch({
                        type: "ADD_TO_CART",
                        payload: { ...product, color: itemColor },
                      })
                    : cartDispatch({
                        type: "INCREASE_QUANTITY",
                        payload: product,
                      });
                  notificationDispatch({
                    type: "ADD_NOTIFICATION",
                    payload: {
                      id: v4(),
                      type: "SUCCESS",
                      message: !IsAlreadyPresentInCart
                        ? `${name} Added to Cart`
                        : `Quantity Increased`,
                    },
                  });
                }}
              >
                {`${"add to cart".toUpperCase()}`}{" "}
              </button>
            ) : (
              <button
                className="btn btn-danger primary-add-to"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                {`${"goto cart".toUpperCase()} `}
              </button>
            )}

            {IsAlreadyPresentInArray ? (
              <button
                className="btn btn-secondary primary-add-to"
                onClick={() => {
                  navigate("/wishlist");
                }}
              >
                {`${"goto Wishlist".toUpperCase()} `}
              </button>
            ) : (
              <button
                className="btn btn-secondary primary-add-to"
                onClick={() => {
                  wishlistDispatch({
                    type: "TOGGLE_WISHLIST",
                    payload: product,
                  });
                  notificationDispatch({
                    type: "ADD_NOTIFICATION",
                    payload: {
                      id: v4(),
                      type: "SUCCESS",
                      message: "Item added to Wishlist",
                    },
                  });
                }}
              >
                <i
                  className="far fa-heart mr-large"
                  style={{ fontSize: "1.2rem" }}
                ></i>
                {`${"Add to Wishlist".toUpperCase()} `}{" "}
              </button>
            )}
          </div>
        </div>

        <div className="features-product d-flex jc-space-evenly mt-extra-large">
          <div className="wrapper-free-delivery">
            <div className="wrapper-image-free-delivery">
              <img
                src="https://img.icons8.com/ios-filled/50/fa314a/free-shipping.png"
                className="image-free-delivery"
                alt="free delivery"
              />
            </div>
            <div className="fs-2 ml-medium red text-primary">Free Delivery</div>
          </div>

          <div className="wrapper-free-delivery">
            <div className="wrapper-image-free-delivery">
              <img
                src="https://img.icons8.com/material/48/fa314a/security-checked--v1.png"
                className="image-free-delivery"
                alt="secured delivery"
              />
            </div>
            <div className="fs-2 ml-medium red text-primary">
              Secured Payment
            </div>
          </div>

          <div className="wrapper-free-delivery">
            <div className="wrapper-image-free-delivery">
              <img
                src="https://img.icons8.com/material/48/fa314a/replace.png"
                className="image-free-delivery"
                alt="easy replacement"
              />
            </div>
            <div className="fs-2 ml-medium red text-primary">Easy Return</div>
          </div>
        </div>
      </div>
    </>
  );
};

export { CardItemDetails };
