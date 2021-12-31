import axios from "axios";
import { v4 } from "uuid";

import { useNotifications } from "../../contexts/useNotifications";
import { increaseQuantityOfItemInRespectiveColor } from "../../pages/cart/ReducerCart";
import {
  isItemOutOfStock,
  isItemOutOfStockInRespectiveColor,
} from "../../pages/store/ReducerStore";

const getQuantityOfItemInRespectiveColor = (itemInCart) => {
  const quantityOfItemInRespectiveColor = itemInCart.availableColors
    .map((colorObj) =>
      colorObj.color === itemInCart.color
        ? colorObj.quantityOfItemInRespectiveColor
        : null
    )
    .filter((colorObj) => colorObj != null)[0];
  console.log({ quantityOfItemInRespectiveColor });
};

const CardItemInCart = ({ itemInCart, cart, cartDispatch }) => {
  let {
    image,
    name,
    brand,
    offer,

    color,

    price,
    totalQuantity,
  } = itemInCart;

  const { dispatch: notificationDispatch } = useNotifications();
  return (
    <>
      <div className="card-itemCart-container d-flex mt-extra-large">
        <span
          className="btn-remove-from-cart header-secondary"
          onClick={() => {
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
                    const updateItemOnServer = async (itemInCart) => {
                      const requiredUpdateInItem = {
                        totalQuantity: itemInCart.totalQuantity + 1,
                        colorObj: {
                          color: itemInCart.color,
                          quantityOfItemInRespectiveColor:
                            getQuantityOfItemInRespectiveColor(itemInCart),
                        },
                      };
                      const response = axios.post(``, requiredUpdateInItem);
                      console.log(
                        "merko toh aisa dhag dhag ho rela hai",
                        response
                      );
                      const {
                        data: { success, message, newCartItem },
                      } = response;
                      return success
                        ? cartDispatch({
                            type: "INCREASE_QUANTITY",
                            payload: { newCartItem },
                          })
                        : null;
                    };
                    await updateItemOnServer(itemInCart);
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
                onClick={() => {
                  cartDispatch({
                    type: "DECREASE_QUANTITY",
                    payload: itemInCart,
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
