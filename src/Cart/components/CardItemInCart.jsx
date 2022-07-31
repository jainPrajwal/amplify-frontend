import { useState } from "react";
import { v4 } from "uuid";
import { useAuth } from "../../Auth/context/useAuth";
import { useNotifications } from "../../Home/components/notification/context/useNotifications";
import {
  getQuantityOfItemInRespectiveColor,
  isItemOutOfStock,
  isItemOutOfStockInRespectiveColor,
  updateItemOnServer,
} from "../../utils";
import { removeFromCartFromServer } from "../../utils/utils";
import { InlineLoader } from "../../Loader/InlineLoader";
import "./cart.css";
import { useNavigate } from "react-router";
import { Loader } from "kaali-ui";

const CardItemInCart = ({ itemInCart, cartDispatch }) => {
  
  let {
    _id,
    productId,
    name,
    brand,
    offer,

    color,

    price,
    totalQuantity,
  } = itemInCart;
  const { dispatch: notificationDispatch } = useNotifications();
  const { loggedInUser } = useAuth();
  const [status, setStatus] = useState(`idle`);
  const navigate = useNavigate();


 
  return (
    <>
      <div className="card-itemCart-container d-flex mt-lg">
        <span
          className="btn-remove-from-cart header-secondary"
          onClick={() => {
            removeFromCartFromServer({
              loggedInUser,
              _id,
              cartDispatch,
              notificationDispatch,
              itemInCart,
              name,
              setStatus,
            });
          }}
        >
          &times;
        </span>
        <div
          className="card-itemCart-image-wrapper"
          onClick={() => {
            navigate(`/products/${productId}`);
          }}
        >
          <img 
            src={
              itemInCart.availableColors.find(
                (color) => color.color === itemInCart.color
              )?.image || itemInCart.image
            }
          alt={name} className="w-100 h-100" />
        </div>

        <div className="card-itemCart-content ml-md w-100 p-md">
          <div className="card-itemCart-title text-primary fs-2 mb-small">
            {brand}
          </div>
          <div className="card-itemCart-subtitle mt-md">{name}</div>
          <div className="card-itemCart-subtitle mt-md">
            {color}
          </div>

          <div className="card-itemCart-quantity-details mt-md">
            {status === `idle` ? (
              <div className="card-itemCart-quantity d-flex ai-center fs-1">
                Quantity :
                <button
                  className="btn-round"
                  onClick={async () => {
                    if (totalQuantity > 1) {
                      const requiredUpdateInItem = {
                        totalQuantity: itemInCart.totalQuantity - 1,
                        colorObj: {
                          color: itemInCart.color,
                          quantityOfItemInRespectiveColor:
                            getQuantityOfItemInRespectiveColor(itemInCart),
                        },
                      };

                      await updateItemOnServer({
                        itemInCart,
                        setStatus,
                        loggedInUser,
                        cartDispatch,
                        requiredUpdateInItem,
                        type: "DECREASE_QUANTITY",
                      });
                    } else {
                      await removeFromCartFromServer({
                        setStatus,
                        loggedInUser,
                        _id,
                        cartDispatch,
                        notificationDispatch,
                        itemInCart,
                        name,
                      });
                    }

                    notificationDispatch({
                      type: "ADD_NOTIFICATION",
                      payload: {
                        id: v4(),
                        type: "DANGER",
                        message: `${
                          totalQuantity > 1
                            ? "Quantity decreased"
                            : `${name} removed from cart`
                        }`,
                      },
                    });
                  }}
                >
                  <div className="fs-1 sign-minus"></div>
                </button>
                <span className="text-primary mx-1">{totalQuantity}</span>
                <button
                  className="btn-round"
                  disabled={isItemOutOfStock(itemInCart)}
                  onClick={async () => {
                    if (!isItemOutOfStockInRespectiveColor(itemInCart)) {
                      const requiredUpdateInItem = {
                        totalQuantity: itemInCart.totalQuantity + 1,
                        colorObj: {
                          color: itemInCart.color,
                          quantityOfItemInRespectiveColor:
                            getQuantityOfItemInRespectiveColor(itemInCart),
                        },
                      };

                      await updateItemOnServer({
                        setStatus,
                        itemInCart,
                        loggedInUser,
                        cartDispatch,
                        requiredUpdateInItem,
                        type: "INCREASE_QUANTITY",
                      });
                    }

                    notificationDispatch({
                      type: "ADD_NOTIFICATION",
                      payload: {
                        id: v4(),
                        type: "SUCCESS",
                        message: isItemOutOfStockInRespectiveColor(itemInCart)
                          ? `item is OUT OF STOCK!`
                          : `Quantity increased`,
                      },
                    });
                  }}
                >
                  {<span className="fs-1 text-white">+</span>}
                </button>
              </div>
            ) : (
               <div className="d-flex jc-center ai-center">
                <Loader
                  width={`24px`}
                  height={`24px`}
                  borderWidth={`2px`}
                  borderTopColor={`var(--kaali-danger)`}
                />
              </div>
            )}
          </div>

          <div className="itemCart-price-details d-flex mt-md">
            <div className="itemCart-price mr-small">
              <strong>
                ₹
                {`${
                  offer === "70% bonanza"
                    ? parseInt(price - (price / 100) * 70)
                    : offer === "Save 50"
                    ? parseInt(price - 50)
                    : parseInt(price - 22)
                }`}
              </strong>
            </div>
            <div className="product-selling-price mr-md">₹{price}</div>
            <div className="product-discount">({offer})</div>
          </div>
        </div>
      </div>
    </>
  );
};

export { CardItemInCart };
