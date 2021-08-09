import { Badge } from "./Badge";
import { WishListIcon } from "./WishListIcon";
const CardItemInStore = ({
  product: { image, name, brand, offer, inStock, fastDelivery, color },
}) => {
  return (
    <div className="card card-ecommerce">
      <Badge fastDelivery={fastDelivery} />
      <WishListIcon />
      <div className="card-image-wrapper">
        <img src={image} className="card-image-ecommerce" alt={name} />
      </div>
      <div className="card-content-ecommerce">
        <div className="card-title header header-tertiary">
          <strong>{brand}</strong>
        </div>
        <div className="card-subtitle">
          {`${inStock ? "In Stock" : "Out of Stock"}`}
          <div>{`Color : ${color}`}</div>
        </div>
        <hr />
        <div className="product-price-details">
          <div className="product-price">
            <strong>₹499</strong>
          </div>
          <div className="product-mrp">₹699</div>
          <div className="product-discount">({offer})</div>
        </div>
        <div>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export { CardItemInStore };
