import { useNavigate } from "react-router";
import { ContainerEcommerce } from "../Product/components/ContainerEcommerce";
import { CardWishlist } from "./components/CardWishlist";
import { useWishlist } from "./context/useWishlist";

const Wishlist = () => {
  const { state: wishlist } = useWishlist();
  const navigate = useNavigate();
  return (
    <>
      <div className="header header-secondary text-black text-center">
        Your Wishlist
      </div>
      {wishlist && wishlist.length <= 0 && (
        <div className="d-flex f-direction-col ai-center jc-center">
          <div className="d-flex f-direction-col gap-10">
            <div style={{ maxWidth: `220px` }} className="">
              <img
                src="https://res.cloudinary.com/dmk11fqw8/image/upload/v1659461512/undraw_no_data_re_kwbl_1_wlzwkm.svg"
                className="w-100"
                alt={`no data`}
              />
            </div>

            <div className="header-tertiary text-center my-lg">
              {" "}
              Nothing in wishlist..!
            </div>
          </div>
          <button
            className="btn btn-danger my-lg"
            onClick={() => navigate(`/store`)}
          >
            Explore Products
          </button>
        </div>
      )}
      <ContainerEcommerce>
        <CardWishlist />
      </ContainerEcommerce>
    </>
  );
};

export { Wishlist };
