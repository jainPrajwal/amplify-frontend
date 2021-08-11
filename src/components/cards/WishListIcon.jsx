import { v4 } from "uuid";
import { useNotifications } from "../../contexts/useNotifications";
import { useWishlist } from "../../contexts/useWishlist";
import { checkIfItemIsAlreadyPresentInArray } from "../../pages/wishlist/ReducerWishlist";
import { HeartSvg } from "./HeartSvg";

const WishListIcon = ({ product }) => {
  const { state: wishlist, dispatch: wishlistDispatch } = useWishlist();
  const { dispatch: notificationDispatch } = useNotifications();
  // const checkIfItemIsAlreadyPresentInArray(wishlist, product);
  return (
    <>
      <HeartSvg />
      <i
        className={`fas fa-heart ${
          checkIfItemIsAlreadyPresentInArray(wishlist, product) ? "red" : ""
        }`}
        onClick={() => {
          wishlistDispatch({
            type: "TOGGLE_WISHLIST",
            payload: product,
          });
          notificationDispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: v4(),
              type: "DANGER",
              message: "Item Added to Cart",
            },
          });
        }}
      ></i>
      <svg
        className={`icon icon-heart ${
          checkIfItemIsAlreadyPresentInArray(wishlist, product) ? "like" : ""
        }`}
      >
        <use xlinkHref="#icon-heart"></use>
      </svg>
    </>
  );
};

export { WishListIcon };
