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
import { removeFromCartFromServer } from "../../utils/utils";
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
            });
          }}
        >
          &times;
        </span>
        <div className="card-itemCart-image-wrapper">
          <img src={image} alt={name} className="w-100 h-100" />
        </div>

        <div className="card-itemCart-content ml-md w-100 py-small">
          <div className="card-itemCart-title text-primary fs-2 mb-small">
            {brand}
          </div>
          <div className="card-itemCart-subtitle text-small">{name}</div>
          <div className="card-itemCart-subtitle text-small mt-small">
            {color}
          </div>

          <div className="card-itemCart-quantity-details mt-md">
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
                      loggedInUser,
                      cartDispatch,
                      requiredUpdateInItem,
                      type: "DECREASE_QUANTITY",
                    });
                  } else {
                    await removeFromCartFromServer({
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
            </div>
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
