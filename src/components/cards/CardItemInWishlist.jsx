import axios from "axios";
import { useNavigate } from "react-router";
import { v4 } from "uuid";
import { useAuth } from "../../contexts/useAuth";
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

    fastDelivery,

    category,
    subcategory,
  } = wishlistedItem;
  let navigate = useNavigate();
  const { state: cart, dispatch: cartDispatch } = useCart();
  const { dispatch: notificationDispatch } = useNotifications();
  const { loggedInUser } = useAuth();

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
            onClick={async () => {
              const saveItemToServer = async () => {
                let product = { ...getProductById(productId) };
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
                  console.log("error", error?.response?.data?.errorMessage);
                }
              };
              await saveItemToServer();
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
