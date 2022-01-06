import { useNavigate } from "react-router";
import { v4 } from "uuid";
import { useCart } from "../../contexts/useCart";
import { useNotifications } from "../../contexts/useNotifications";
import { useProducts } from "../../contexts/useProducts";
import { checkIfItemIsAlreadyPresentInArray } from "../../pages/wishlist/ReducerWishlist";
import { Badge } from "./Badge";
import { WishListIcon } from "./WishListIcon";

const CardItemInWishlist = ({ wishlistedItem }) => {
  let {
    _id,
    productId,
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
  } = wishlistedItem;
  let navigate = useNavigate();
  const { state: cart, dispatch: cartDispatch } = useCart();
  const { dispatch: notificationDispatch } = useNotifications();

  const { state: storeObj } = useProducts();

  const getProductById = (id) => {
    return storeObj.store.find((itemInStore) => itemInStore._id === id);
  };

  const IsAlreadyPresentInArray = checkIfItemIsAlreadyPresentInArray(
    cart,
    getProductById(productId)
  );

  console.log("is wishlisdted in here..", wishlistedItem);

  return (
    <div className="card card-ecommerce">
      <Badge fastDelivery={fastDelivery} />
      <WishListIcon wishlistedItem={wishlistedItem} />
      <div onClick={() => navigate(`/products/${_id}`)}>
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
                payload: getProductById(productId),
              });
              notificationDispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                  id: v4(),
                  type: "SUCCESS",
                  message: "Item Added to Cart",
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

export { CardItemInWishlist };
