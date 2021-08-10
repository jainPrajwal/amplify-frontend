import { WishListIcon } from "./WishListIcon";

const CardItemInCart = ({
  itemInCart: {
    id,
    image,
    name,
    brand,
    offer,
    inStock,
    fastDelivery,
    color,
    category,
    subcategory,
    price,
  },
  cart,
}) => {
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
          <div class="badge-rating">
            <div>
                <span class="rating">4.3</span>
            </div>
            <div>
              <i class="fas fa-star text-white"></i> 
            </div>{" "}
            <span className="text-white">
              | 20 <span className="text-white ">Ratings</span>
            </span>
               
          </div>
        </div>
        <div className="header header-tertiary text-black">
          {`Color : ${color}`}
        </div>
        <div className="header header-tertiary text-black">
          {`${inStock ? "In Stock" : "Out of Stock"}`}
        </div>

        <div className="product-price-details-in-cart mb-extra-large">
          <div className="product-price ">
            <strong className="header header-tertiary text-black">
              ₹{" "}
              {`${
                offer === "70% bonanza"
                  ? parseInt(price - (price / 100) * 70)
                  : "699"
              }`}
            </strong>
            <span className="product-mrp ml-medium  fs-2">₹{price}</span>
            <span className="product-discount fs-2 ml-medium">({offer})</span>
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

export { CardItemInCart };
