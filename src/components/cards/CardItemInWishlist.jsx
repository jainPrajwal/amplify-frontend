import { useNavigate } from "react-router";
import { useCart } from "../../contexts/useCart";
import { useProducts } from "../../contexts/useProducts";
import { Badge } from "./Badge";

const CardItemInWishlist = ({
  wishlistedItem: {
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
}) => {
  let navigate = useNavigate();
  const { state: cart, dispatch: cartDispatch } = useCart();

  const { state: storeObj } = useProducts();

  const getProductById = (id) => {
    return storeObj.store.find((itemInCart) => itemInCart.id === id);
  };

  return (
    <div className="card card-ecommerce">
      <Badge fastDelivery={fastDelivery} />

      <div onClick={() => navigate(`/products/${id}`)}>
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
            <strong>{brand}</strong>
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
        </div>
      </div>
      <div className="px-1">
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
  );
};

export { CardItemInWishlist };
