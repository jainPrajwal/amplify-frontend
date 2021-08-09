import { HeartSvg } from "./HeartSvg";

const WishListIcon = () => {
  <HeartSvg />;
  return (
    <>
      <i className="fas fa-heart" onClick={() => {}}></i>
      <svg className="icon icon-heart">
        <use xlinkHref="#icon-heart"></use>
      </svg>
    </>
  );
};

export { WishListIcon };
