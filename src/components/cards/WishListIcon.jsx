import { useWishlist } from "../../contexts/useWishlist";
import { checkIfItemIsAlreadyPresentInArray } from "../../pages/wishlist/ReducerWishlist";
import { HeartSvg } from "./HeartSvg";

const WishListIcon = ({ product }) => {
  const { state: wishlist, dispatch: wishlistDispatch } = useWishlist();
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
