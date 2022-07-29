import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { v4 } from "uuid";
import "./cardItemDetails.css";
import { useAuth } from "../../Auth/context/useAuth";
import { useWishlist } from "../../Wishlist/context/useWishlist";
import { useProducts } from "../../Product/context/useProducts";
import {
  addItemToWishlist,
  checkIfItemIsAlreadyPresentInCartWithSameColor,
  checkIfItemIsAlreadyPresentInWishlist,
  getProductById,
  isItemOutOfStockInRespectiveColor,
  removeItemFromWishlist,
} from "../../utils";
import { useNotifications } from "../../Home/components/notification/context/useNotifications";
import { useCart } from "../../Cart/context/useCart";
import { CheckboxPanel } from "./CheckboxPanel";
import { InlineLoader } from "../../Loader/InlineLoader";
import { BASE_API } from "../../constants/api";

const CardItemDetails = () => {
  let { productId } = useParams();
  const { state: wishlist, dispatch: wishlistDispatch } = useWishlist();
  const {
    state: { store },
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

  const [wishlistStatus, setWishlistStatus] = useState(`idle`);
  const [cartStatus, setCartStatus] = useState(`idle`);

  const IsAlreadyPresentInWishlist = checkIfItemIsAlreadyPresentInWishlist(
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
            `${BASE_API}/products/${productId}`
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
          src={product.availableColors.find(color => color.color === itemColor)?.image || product.image}
          className="card-image-ecommerce"
          alt={product.name}
        />
      </div>
      <div className="card-content-ecommerce-product-details">
        <div className="header-secondary text-black">
          <span>{product.brand}</span>
        </div>
        <div>
          <span className="text-gray fs-2">
            {product.category}
          </span>
          <span className="card-subtitle text-gray fs-2 ml-sm">
            {product.subcategory}
          </span>
        </div>

        <div className="ratings-cart mt-md">
          <div className="badge-rating ">
            4.7
            <i
              className="fas fa-star text-white ml-sm"
              style={{ fontSize: "small" }}
            ></i>
            <span className="text-white">
              <span className="text-white mx-1">|</span>
              <span className="text-white ">20 Ratings</span>
            </span>
          </div>
        </div>

        <div className="product-price-details-in-cart mt-lg">
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
            <span className="product-selling-price ml-md  fs-2">
              ₹{product.price}
            </span>
            <span className="product-discount fs-2 ml-md">
              ({product.offer})
            </span>
            <div className="text-primary  fs-14 text-green">
              inclusive of all taxes
            </div>
          </div>
        </div>

        <div className="text-primary text-black mt-lg">
          {`${`select Color`.toUpperCase()}`}
          <div className="d-flex mt-md color-palette">
            <CheckboxPanel
              product={product}
              key={product._id}
              colorObject={{ itemColor, setItemColor }}
            />
          </div>{" "}
        </div>

        <div className="btn-outer-wrapper-prod-detail mt-lg">
          <div className="btn-wrapper-prod-detail">
            {!IsAlreadyPresentInCart ? (
              <button
                className="btn btn-danger primary-add-to"
                disabled={isItemOutOfStockInRespectiveColor(product)}
                onClick={async () => {
                  const saveItemToServer = async () => {
                    setCartStatus(`loading`);
                    let productToBeSaved = {
                      ...getProductById(store, product._id),
                    };

                    productToBeSaved["productId"] = productToBeSaved._id;

                    delete productToBeSaved._id;

                    try {
                      const response = await axios.post(
                        `${BASE_API}/cart/${loggedInUser.userId}`,
                        { ...productToBeSaved, color: itemColor }
                      );

                      const savedProduct = response?.data?.cartItem;
                      if (savedProduct) {
                        setCartStatus(`idle`);
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
                        setCartStatus(`error`);
                        throw new Error(
                          "some error occured while saving item to server"
                        );
                      }
                    } catch (error) {
                      
                    }
                  };
                  !loggedInUser?.userId
                    ? notificationDispatch({
                        type: "ADD_NOTIFICATION",
                        payload: {
                          id: v4(),
                          type: "DANGER",
                          message: `Please Login To Add Item To Cart`,
                        },
                      })
                    : saveItemToServer();
                }}
              >
                {cartStatus === "loading" ? (
                  <InlineLoader />
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

            {IsAlreadyPresentInWishlist?.productId ? (
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
                onClick={async () => {
                  const toggleWishlistOnServer = async () => {
                    if (IsAlreadyPresentInWishlist?.productId) {
                      await removeItemFromWishlist({
                        product,
                        userId: loggedInUser.userId,
                        setStatus: setCartStatus,
                        wishlistDispatch,
                      });
                    } else {
                      await addItemToWishlist({
                        product,
                        userId: loggedInUser.userId,
                        wishlistDispatch,
                        setStatus: setWishlistStatus,
                      });
                    }
                    notificationDispatch({
                      type: "ADD_NOTIFICATION",
                      payload: {
                        id: v4(),
                        type: IsAlreadyPresentInWishlist?.productId
                          ? "DANGER"
                          : "SUCCESS",
                        message: IsAlreadyPresentInWishlist?.productId
                          ? `${IsAlreadyPresentInWishlist.name} removed from  Wishlist`
                          : `${product.name} added to Wishlist`,
                      },
                    });
                  };

                  !loggedInUser?.userId
                    ? notificationDispatch({
                        type: "ADD_NOTIFICATION",
                        payload: {
                          id: v4(),
                          type: "DANGER",
                          message: `Please Login To Add Item To Wishlist`,
                        },
                      })
                    : await toggleWishlistOnServer();
                }}
              >
                {wishlistStatus === "loading" ? (
                  <InlineLoader />
                ) : (
                  <>
                    <i
                      className="far fa-heart mr-lg"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    {"add to wishlist".toUpperCase()}
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="features-product d-flex jc-space-evenly mt-lg">
          <div className="wrapper-free-delivery">
            <div className="wrapper-image-free-delivery">
              <img
                src="https://img.icons8.com/ios-filled/50/fa314a/free-shipping.png"
                className="image-free-delivery"
                alt="free delivery"
              />
            </div>
            <div className="fs-2 ml-md red text-primary">Free Delivery</div>
          </div>

          <div className="wrapper-free-delivery">
            <div className="wrapper-image-free-delivery">
              <img
                src="https://img.icons8.com/material/48/fa314a/security-checked--v1.png"
                className="image-free-delivery"
                alt="secured delivery"
              />
            </div>
            <div className="fs-2 ml-md red text-primary">Secured Payment</div>
          </div>

          <div className="wrapper-free-delivery">
            <div className="wrapper-image-free-delivery">
              <img
                src="https://img.icons8.com/material/48/fa314a/replace.png"
                className="image-free-delivery"
                alt="easy replacement"
              />
            </div>
            <div className="fs-2 ml-md red text-primary">Easy Return</div>
          </div>
        </div>
      </div>
    </>
  );
};

export { CardItemDetails };
