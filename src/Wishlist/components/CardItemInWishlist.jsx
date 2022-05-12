import axios from "axios";
import { useNavigate } from "react-router";
import { v4 } from "uuid";
import { useAuth } from "../../Auth/context/useAuth";
import { useCart } from "../../Cart/context/useCart";
import { useNotifications } from "../../Home/components/notification/context/useNotifications";
import { Badge } from "../../Product/components/Badge";
import { useProducts } from "../../Product/context/useProducts";
import { checkIfItemIsAlreadyPresentInArray } from "../../utils";
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
            <span className="card-subtitle text-black ml-md">
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
                    throw new Error(
                      "some error occured while saving item to server"
                    );
                  }
                } catch (error) {}
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
