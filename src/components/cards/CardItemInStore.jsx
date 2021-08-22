import { useNavigate } from "react-router";
import { useCart } from "../../contexts/useCart";
import { useNotifications } from "../../contexts/useNotifications";

import { Badge } from "./Badge";
import { WishListIcon } from "./WishListIcon";
import { v4 } from "uuid";
import { checkIfItemIsAlreadyPresentInArray } from "../../pages/wishlist/ReducerWishlist";

const CardItemInStore = ({
  product: {
    id,
    image,
    name,
    brand,
    offer,
    inStock,
    fastDelivery,
    color,
    category,
    subcategory,
    price,
    sellingPrice,
  },
  store,
}) => {
  const { state: cart, dispatch: cartDispatch } = useCart();

  const { dispatch: notificationDispatch } = useNotifications();

  const getProductById = (id) => {
    return store.find((itemInCart) => itemInCart.id === id);
  };
  const IsAlreadyPresentInArray = checkIfItemIsAlreadyPresentInArray(
    cart,
    getProductById(id)
  );

  let navigate = useNavigate();

  return (
    <div
      className={`card card-ecommerce ${
        cart
          .map((itemInCart) => {
            if (itemInCart.id === id) {
              if (!itemInCart.inStock) return "out-of-stock";
              return null;
            }
            return null;
          })
          .filter((item) => item !== null)[0]
      }`}
    >
      <Badge fastDelivery={fastDelivery} />

      <WishListIcon product={getProductById(id)} />
      <div
        onClick={() => {
          navigate(`/products/${id}`);
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
            {`Color : ${color}`} {`${inStock ? "In Stock" : "Out of Stock"}`}
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
            className="btn btn-primary"
            onClick={() => {
              cartDispatch({
                type: "ADD_TO_CART",
                payload: getProductById(id),
              });
              notificationDispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                  id: v4(),
                  type: "SUCCESS",
                  message: `${name} Added to Cart`,
                },
              });
            }}
          >
            {`${"Add to Cart".toUpperCase()}`}
          </button>
        )}
      </div>
    </div>
  );
};

export { CardItemInStore };
