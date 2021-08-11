import { useParams } from "react-router";
import { useProducts } from "../../contexts/useProducts";

const CardItemDetails = () => {
  let { productId } = useParams();
  console.log("productId from detials page", productId);
  const { state } = useProducts();
  const getProductById = (id) => {
    return state.store.find((itemInCart) => itemInCart.id === id);
  };
  let { name, image, brand, category, subcategory, offer, price, color } =
    getProductById(productId);
  return (
    <>
      <div className="card-image-wrapper">
        <img src={image} className="card-image-ecommerce" alt={name} />
      </div>
      <div className="card-content-ecommerce-product-detials">
        <div className="card-title header header-primary">
          <strong>{brand}</strong>
        </div>
        <div className="header header-tertiary">
          <span className="card-subtitle text-black ">{category}</span>
          <span className="card-subtitle text-black ml-small">
            ({subcategory})
          </span>
        </div>
        <div className="ratings-cart">
          <div className="badge-rating mb-extra-large">
            4.7
            <i
              className="fas fa-star text-white ml-small"
              style={{ fontSize: "small" }}
            ></i>
            <span className="text-white">
              <span className="text-white mx-1">|</span>
              <span className="text-white ">20 Ratings</span>
            </span>
          </div>
        </div>
        <div className="header header-tertiary text-black">
          {`Color : ${color}`}
        </div>

        <div className="product-price-details-in-cart mb-extra-large">
          <div className="product-price ">
            <strong className="header header-tertiary text-black">
              ₹
              {`${
                offer === "70% bonanza"
                  ? parseInt(price - (price / 100) * 70)
                  : "699"
              }`}
            </strong>
            <span className="product-mrp ml-medium  fs-2">₹{price}</span>
            <span className="product-discount fs-2 ml-medium">({offer})</span>
            <div className="text-primary green fs-2">
              inclusive of all taxes
            </div>
          </div>
          <div className="features-product d-flex jc-space-evenly mt-extra-large f-wrap">
            <div className="wrapper-free-delivery">
              <div className="wrapper-image-free-delivery">
                <img
                  src="https://img.icons8.com/ios-filled/50/fa314a/free-shipping.png"
                  className="image-free-delivery"
                />
              </div>
              <div className="fs-2 ml-medium red text-primary">
                Free Delivery
              </div>
            </div>

            <div className="wrapper-free-delivery">
              <div className="wrapper-image-free-delivery">
                <img
                  src="https://img.icons8.com/material/48/fa314a/security-checked--v1.png"
                  className="image-free-delivery"
                />
              </div>
              <div className="fs-2 ml-medium red text-primary">
                Secured Payment
              </div>
            </div>

            <div className="wrapper-free-delivery">
              <div className="wrapper-image-free-delivery">
                <img
                  src="https://img.icons8.com/material/48/fa314a/replace.png"
                  className="image-free-delivery"
                />
              </div>
              <div className="fs-2 ml-medium red text-primary">Easy Return</div>
            </div>
          </div>
        </div>

        <div className="btn-wrapper-cart-detail">
          <button className="btn btn-danger primary-add-to">
            {`${"Add to Cart".toUpperCase()}`}{" "}
          </button>
          <button className="btn btn-secondary primary-add-to">
            {`${"Add to Wishlist".toUpperCase()}`}{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export { CardItemDetails };
