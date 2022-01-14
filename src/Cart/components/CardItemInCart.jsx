import axios from "axios";
import { v4 } from "uuid";
import { useAuth } from "../../Auth/context/useAuth";
import { useNotifications } from "../../Home/components/notification/context/useNotifications";
import {
  getQuantityOfItemInRespectiveColor,
  isItemOutOfStock,
  isItemOutOfStockInRespectiveColor,
  updateItemOnServer,
} from "../../utils";
import "./cart.css";

const CardItemInCart = ({ itemInCart, cart, cartDispatch }) => {
  let {
    _id,
    image,
    name,
    brand,
    offer,

    color,

    price,
    totalQuantity,
  } = itemInCart;

  const { dispatch: notificationDispatch } = useNotifications();
  const { loggedInUser } = useAuth();

  return (
    <>
      <div className="card-itemCart-container d-flex mt-extra-large">
        <span
          className="btn-remove-from-cart header-secondary"
          onClick={() => {
            const removeFromCartFromServer = async () => {
              try {
                const {
                  data: { success },
                } = await axios.delete(
                  `http://127.0.0.1:3000/cart/${loggedInUser.userId}/${_id}`
                );
                console.log("success", success);
                if (success) {
                  cartDispatch({
                    type: "REMOVE_FROM_CART",
                    payload: itemInCart,
                  });
                  notificationDispatch({
                    type: "ADD_NOTIFICATION",
                    payload: {
                      id: v4(),
                      type: "DANGER",
                      message: `${name} removed from cart`,
                    },
                  });
                } else {
                  notificationDispatch({
                    type: "ADD_NOTIFICATION",
                    payload: {
                      id: v4(),
                      type: "DANGER",
                      message: `Deletion failed..!`,
                    },
                  });
                }
              } catch (error) {
                console.log("error ", error?.response?.data?.errorMessage);
              }
            };

            removeFromCartFromServer();
          }}
        >
          &times;
        </span>
        <div className="card-itemCart-image-wrapper">
          <img src={image} alt={name} className="w-100 h-100" />
        </div>

        <div className="card-itemCart-content ml-medium w-100 py-small">
          <div className="card-itemCart-title text-primary fs-2 mb-small">
            {brand}
          </div>
          <div className="card-itemCart-subtitle text-small">{name}</div>
          <div className="card-itemCart-subtitle text-small mt-small">
            {color}
          </div>

          <div className="card-itemCart-quantity-details mt-medium">
            <div className="card-itemCart-quantity d-flex ai-center fs-1">
              Quantity :
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
                <span className="fs-1">+</span>
              </button>
              <span className="text-primary mx-1">{totalQuantity}</span>
              <button
                className="btn-round"
                onClick={async () => {
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
                    loggedInUser,
                    cartDispatch,
                    requiredUpdateInItem,
                    type: "DECREASE_QUANTITY",
                  });

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
            </div>
          </div>

          <div className="itemCart-price-details d-flex mt-medium">
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
            <div className="product-selling-price mr-medium">₹{price}</div>
            <div className="product-discount">({offer})</div>
          </div>
        </div>
      </div>
    </>
  );
};

export { CardItemInCart };
