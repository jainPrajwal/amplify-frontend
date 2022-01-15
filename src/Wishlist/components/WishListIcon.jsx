import { v4 } from "uuid";
import { useAuth } from "../../Auth/context/useAuth";
import { useNotifications } from "../../Home/components/notification/context/useNotifications";
import { addItemToWishlist, removeItemFromWishlist } from "../../utils";
import { useWishlist } from "../context/useWishlist";
import { HeartSvg } from "./HeartSvg";

//wishlist,product --> product._id == itemInWishlist.productId
//wishlist,wishlistedItem --> wishlistedItem._id === itemInWishlist._id
const WishListIcon = ({ wishlistedItem, product }) => {
  const { dispatch: wishlistDispatch } = useWishlist();
  const { dispatch: notificationDispatch } = useNotifications();
  const { loggedInUser } = useAuth();

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
