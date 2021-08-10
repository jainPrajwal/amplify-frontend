import { useCart } from "../../contexts/useCart";
import { Badge } from "./Badge";
import { WishListIcon } from "./WishListIcon";

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
  },
  store,
}) => {
  const { state: cart, dispatch: cartDispatch } = useCart();
  const getProductById = (id) => {
    return store.find((itemInCart) => itemInCart.id === id);
  };
  return (
    <div className="card card-ecommerce">
      <Badge fastDelivery={fastDelivery} />
      <WishListIcon />
      <div className="card-image-wrapper">
        <img src={image} className="card-image-ecommerce" alt={name} />
      </div>
      <div className="card-content-ecommerce">
        <div className="card-title header header-tertiary">
          <strong>{brand}</strong>
          <span className="card-subtitle text-black ml-medium">{category}</span>
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
            <strong>
              ₹{" "}
              {`${
                offer === "70% bonanza"
                  ? parseInt(price - (price / 100) * 70)
                  : "699"
              }`}
            </strong>
          </div>
          <div className="product-mrp">₹{price}</div>
          <div className="product-discount">({offer})</div>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() =>
              cartDispatch({ type: "ADD_TO_CART", payload: getProductById(id) })
            }
          >
            {`${"Add to Cart".toUpperCase()}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export { CardItemInStore };
