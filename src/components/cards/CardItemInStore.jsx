import { useNavigate } from "react-router";
import { useCart } from "../../contexts/useCart";
import { useNotifications } from "../../contexts/useNotifications";
import axios from "axios";

import { Badge } from "./Badge";
import { WishListIcon } from "./WishListIcon";
import { v4 } from "uuid";
import { checkIfItemIsAlreadyPresentInArray } from "../../pages/wishlist/ReducerWishlist";
import { isItemOutOfStockInRespectiveColor } from "../../pages/store/ReducerStore";
import { useAuth } from "../../contexts/useAuth";
import { useState } from "react";

const CardItemInStore = ({ product, store }) => {
  const { state: cart, dispatch: cartDispatch } = useCart();
  const { loggedInUser } = useAuth();
  const [status, setStatus] = useState("idle");

  const { dispatch: notificationDispatch } = useNotifications();
  const {
    _id,
    image,
    name,
    brand,
    offer,

    fastDelivery,
    color,
    category,
    subcategory,
    price,
    sellingPrice,
  } = product;

  const getProductById = (id) => {
    return store.find((itemInCart) => itemInCart._id === id);
  };
  const IsAlreadyPresentInArray = checkIfItemIsAlreadyPresentInArray(
    cart,
    getProductById(_id)
  );

  let navigate = useNavigate();

  return (
    <div
      className={`card card-ecommerce ${
        cart
          .map((itemInCart) => {
            if (itemInCart._id === _id) {
              if (isItemOutOfStockInRespectiveColor(itemInCart))
                return "out-of-stock";
              return null;
            }
            return null;
          })
          .filter((item) => item !== null)[0]
      }`}
    >
      <Badge fastDelivery={fastDelivery} />

      <WishListIcon product={getProductById(_id)} />
      <div
        onClick={() => {
          navigate(`/products/${_id}`);
        }}
      >
        <div className="card-image-wrapper">
          <img
            src={image}
            className="card-image-ecommerce"
            alt={name}
            style={{ pointerEvents: "none" }}
          />
        </div>
        <div className="card-content-ecommerce">
          <div className="card-title header header-tertiary">
            <span className="text-black">{brand}</span>
            <span className="card-subtitle text-black ml-medium">
              {category}
            </span>
            <span className="card-subtitle text-black ml-small">
              ({subcategory})
            </span>
          </div>

          <div>
            {`Color : ${color}`}{" "}
            {`${
              isItemOutOfStockInRespectiveColor(product)
                ? "Out of Stock"
                : "In Stock"
            }`}
          </div>
          <hr />
          <div className="product-price-details">
            <div className="product-price">
              <span>₹{sellingPrice}</span>
            </div>
            <div className="product-mrp">₹{price}</div>
            <div className="product-discount">({offer})</div>
          </div>
        </div>
      </div>
      <div className="px-1">
        {IsAlreadyPresentInArray ? (
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/cart");
            }}
          >
            {`${"goto Cart".toUpperCase()}`}
          </button>
        ) : (
          <button
            className={`btn btn-primary ${
              isItemOutOfStockInRespectiveColor(product) ? `btn-disabled` : ``
            }`}
            disabled={isItemOutOfStockInRespectiveColor(product)}
            onClick={async () => {
              const saveItemToServer = async () => {
                let product = { ...getProductById(_id) };
                product["productId"] = product._id;
                delete product._id;

                try {
                  // setStatus("loading");
                  const response = await axios.post(
                    `https://amplitude-backend.herokuapp.com/cart/${loggedInUser.userId}`,
                    product
                  );
                  console.log({ response });
                  const savedProduct = response?.data?.cartItem;
                  if (savedProduct) {
                    // setStatus("idle");
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
                        message: `${name} Added to Cart`,
                      },
                    });
                  } else {
                    console.log("yaha error hai");
                    throw new Error(
                      "some error occured while saving item to server"
                    );
                  }
                } catch (error) {
                  setStatus("error");
                  console.log("error", error?.response?.data?.errorMessage);
                }
              };
              await saveItemToServer();
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
              `${"Add to Cart".toUpperCase()}`
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export { CardItemInStore };
