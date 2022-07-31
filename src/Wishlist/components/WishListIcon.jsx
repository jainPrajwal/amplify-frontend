import { Loader } from "kaali-ui";
import { useState } from "react";
import { useEffect, useRef } from "react";
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
  const countRef = useRef(0);

  useEffect(() => {
    countRef.current++;
  });
  const [status, setStatus] = useState(`idle`);

  return status === `idle` ? (
    <>
      {countRef.current <= 1 && <HeartSvg />}

      <i
        className={`fas fa-heart ${
          wishlistedItem?.productId && loggedInUser?.userId ? "red" : ""
        }`}
        onClick={async () => {
          const toggleWishlistOnServer = async () => {
            if (wishlistedItem?.productId) {
              await removeItemFromWishlist({
                product: wishlistedItem,
                userId: loggedInUser.userId,
                wishlistDispatch,
                setStatus,
              });
            } else {
              await addItemToWishlist({
                product,
                userId: loggedInUser.userId,
                wishlistDispatch,
                setStatus,
              });
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
  ) : (
    <span
      className="circular-loading"
      style={{ height: `34px`, width: `34px` }}
    >
      <div className="d-flex jc-center ai-center">
        <Loader
          width={`20px`}
          height={`20px`}
          borderWidth={`2px`}
          borderTopColor={`var(--kaali-danger)`}
        />
      </div>
    </span>
  );
};

export { WishListIcon };
