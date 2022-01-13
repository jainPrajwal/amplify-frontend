import { v4 } from "uuid";
import { useNotifications } from "../../contexts/useNotifications";
import { useWishlist } from "../../contexts/useWishlist";
import { HeartSvg } from "./HeartSvg";
import axios from "axios";
import { useAuth } from "../../contexts/useAuth";
export const addItemToWishlist = async (product, userId, wishlistDispatch) => {
  try {
    let productToBeWishlisted = { ...product };
    productToBeWishlisted["productId"] = product._id;
    delete productToBeWishlisted._id;
    const {
      data: { success, message, wishlist },
    } = await axios.post(
      `https://amplitude-backend.herokuapp.com/wishlist/${userId}`,
      productToBeWishlisted
    );
    
    if (success) {
      wishlistDispatch({
        type: "ADD_TO_WISHLIST",
        payload: { updatedWishlist: wishlist?.wishlistItems },
      });
    }
  } catch (error) {
    console.log("error", error?.response?.data?.errorMessage);
  }
};

export const removeItemFromWishlist = async (
  product,
  userId,
  wishlistDispatch
) => {
  try {
    
    const {
      data: { success, message },
    } = await axios.delete(
      `https://amplitude-backend.herokuapp.com/wishlist/${userId}/${product._id}`
    );
    if (success) {
      wishlistDispatch({
        type: "REMOVE_FROM_WISHLIST",
        payload: { product },
      });
    }
  } catch (error) {
    console.log("error", error?.response?.data?.errorMessage);
  }
};
export const checkIfItemIsAlreadyPresentInWishlist = (wishlist, item) => {
  const foundItem = {
    ...wishlist.find((itemInWishlist) => {
      return itemInWishlist.productId === item._id;
    }),
  };
  
  return foundItem;
};

//wishlist,product --> product._id == itemInWishlist.productId
//wishlist,wishlistedItem --> wishlistedItem._id === itemInWishlist._id
const WishListIcon = ({ wishlistedItem, product }) => {
  const { state: wishlist, dispatch: wishlistDispatch } = useWishlist();
  const { dispatch: notificationDispatch } = useNotifications();
  const { loggedInUser } = useAuth();
  // const IsAlreadyPresentInArray = checkIfItemIsAlreadyPresentInArray(
  //   wishlist,
  //   wishlistedItem
  // );

  // const IsAlreadyPresentInWishlist = checkIfItemIsAlreadyPresentInWishlist(
  //   wishlist,
  //   wishlistedItem
  // );

  return (
    <>
      <HeartSvg />
      <i
        className={`fas fa-heart ${wishlistedItem?.productId ? "red" : ""}`}
        onClick={async () => {
          const toggleWishlistOnServer = async () => {
            
            if (wishlistedItem?.productId) {
              await removeItemFromWishlist(
                wishlistedItem,
                loggedInUser.userId,
                wishlistDispatch
              );
            } else {
              await addItemToWishlist(
                product,
                loggedInUser.userId,
                wishlistDispatch
              );
            }
            notificationDispatch({
              type: "ADD_NOTIFICATION",
              payload: {
                id: v4(),
                type: wishlistedItem?.productId ? "DANGER" : "SUCCESS",
                message: wishlistedItem?.productId
                  ? `${wishlistedItem.name} removed from  Wishlist`
                  : `${product.name} added to Wishlist`,
              },
            });
          };
          !loggedInUser.userId
            ? notificationDispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                  id: v4(),
                  type: "DANGER",
                  message: `Please Login To Add Item To Wishlist`,
                },
              })
            : await toggleWishlistOnServer();
        }}
      ></i>
      <svg
        className={`icon icon-heart ${wishlistedItem?.productId ? "like" : ""}`}
      >
        <use xlinkHref="#icon-heart"></use>
      </svg>
    </>
  );
};

export { WishListIcon };
