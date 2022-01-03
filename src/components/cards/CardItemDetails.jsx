import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react/cjs/react.development";
import { v4 } from "uuid";

import { useCart } from "../../contexts/useCart";
import { useAuth } from "../../contexts/useAuth";

import { useNotifications } from "../../contexts/useNotifications";
import { useProducts } from "../../contexts/useProducts";
import { useWishlist } from "../../contexts/useWishlist";
import { isItemOutOfStockInRespectiveColor } from "../../pages/store/ReducerStore";
import { checkIfItemIsAlreadyPresentInArray } from "../../pages/wishlist/ReducerWishlist";

import { CheckboxPanel } from "./checkbox/CheckboxPanel";

const getProductById = (store, id) => {
  const returnedObject = store.find((itemInStore) => {
    return itemInStore._id === id;
  });

  return returnedObject;
};
const checkIfItemIsAlreadyPresentInCartWithSameColor = (
  cart,
  product,
  itemColor
) => {
  return cart.some(
    (item) => item.productId === product._id && item.color === itemColor
  );
};

const CardItemDetails = () => {
  let { productId } = useParams();
  const { state: wishlist, dispatch: wishlistDispatch } = useWishlist();
  const {
    state: { store, status },
    dispatch: storeDispatch,
  } = useProducts();
  const [product, setProduct] = useState({
    ...getProductById(store, productId),
  });

  const { dispatch: notificationDispatch } = useNotifications();
  let navigate = useNavigate();

  const { state: cart, dispatch: cartDispatch } = useCart();
  const { loggedInUser } = useAuth();

  const [itemColor, setItemColor] = useState(
    getProductById(store, productId).color
  );
  const IsAlreadyPresentInArray = checkIfItemIsAlreadyPresentInArray(
    wishlist,
    product
  );

  const IsAlreadyPresentInCart = checkIfItemIsAlreadyPresentInCartWithSameColor(
    cart,
    product,
    itemColor
  );

  useEffect(() => {
    if (!product) {
      const getProduct = async () => {
        try {
          storeDispatch({ type: "STATUS", payload: "loading" });
          const {
            data: { success, product },
          } = await axios.get(
            `https://amplitude-backend.herokuapp.com/products/${productId}`
          );
          if (success) {
            setProduct(product);

            storeDispatch({ type: "STATUS", payload: "idle" });
          }
        } catch (error) {
          storeDispatch({ type: "STATUS", payload: "error" });
        }
      };
      getProduct();
    }
  }, []);

  return (
  
      <>
        <div className="card-image-wrapper">
          <img
            src={product.image}
            className="card-image-ecommerce"
            alt={product.name}
          />
        </div>
        <div className="card-content-ecommerce-product-details">
          <div className="card-title header header-secondary text-black">
            <span>{product.brand}</span>
          </div>
          <div>
            <span className="card-subtitle text-gray fs-3 ">
              {product.category}
            </span>
            <span className="card-subtitle text-gray fs-2 ml-small">
              ({product.subcategory})
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
                  product.offer === "70% bonanza"
                    ? parseInt(product.price - (product.price / 100) * 70)
                    : product.offer === "Save 50"
                    ? parseInt(product.price - 50)
                    : parseInt(product.price - 22)
                }`}
              </span>
              <span className="product-selling-price ml-medium  fs-2">
                ₹{product.price}
              </span>
              <span className="product-discount fs-2 ml-medium">
                ({product.offer})
              </span>
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
                key={product._id}
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
                  onClick={async () => {
                    const saveItemToServer = async () => {
                      storeDispatch({ type: "STATUS", payload: "loading" });
                      let productToBeSaved = {
                        ...getProductById(store, product._id),
                      };

                      productToBeSaved["productId"] = productToBeSaved._id;

                      delete productToBeSaved._id;

                      try {
                        const response = await axios.post(
                          `https://amplitude-backend.herokuapp.com/cart/${loggedInUser.userId}`,
                          { ...productToBeSaved, color: itemColor }
                        );

                        const savedProduct = response?.data?.cartItem;
                        if (savedProduct) {
                          storeDispatch({ type: "STATUS", payload: "idle" });
                          cartDispatch({
                            type: "ADD_TO_CART",
                            payload: {
                              cartItem: savedProduct,
                            },
                          });
                          notificationDispatch({
                            type: "ADD_NOTIFICATION",
                            payload: {
                              id: v4(),
                              type: "SUCCESS",
                              message: `${product.name} Added to Cart`,
                            },
                          });
                        } else {
                          storeDispatch({ type: "STATUS", payload: "error" });
                          throw new Error(
                            "some error occured while saving item to server"
                          );
                        }
                      } catch (error) {
                        console.log(
                          "error",
                          error?.response?.data?.errorMessage
                        );
                      }
                    };
                    saveItemToServer();
                  }}
                >
                  {status === "loading" ? (
                    <>
                      <img
                        src="https://c.tenor.com/NqKNFHSmbssAAAAi/discord-loading-dots-discord-loading.gif"
                        alt="loading"
                        width="50px"
                        height="12px"
                      />
                    </>
                  ) : (
                    `${"add to cart".toUpperCase()}`
                  )}
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
              <div className="fs-2 ml-medium red text-primary">
                Free Delivery
              </div>
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
