import { Badge } from "./Badge";
import { WishListIcon } from "./WishListIcon";

const CardProduct = () => {
  return (
    <>
      <div className="card card-ecommerce">
        <Badge />
        <WishListIcon />
        <div className="card-image-wrapper">
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Untitled-2Artboard-1_360x.png?v=1616068901"
            className="card-image-ecommerce"
            alt="tshirt"
          />
        </div>
        <div className="card-content-ecommerce">
          <div className="card-title">
            <strong>brand</strong>
          </div>
          <div className="card-subtitle">description</div>
          <hr />
          <div className="product-price-details">
            <div className="product-price">
              <strong>₹499</strong>
            </div>
            <div className="product-mrp">₹699</div>
            <div className="product-discount">(FLAT 20% OFF)</div>
          </div>
        </div>
      </div>
      <div className="card card-ecommerce">
        <Badge />
        <WishListIcon />
        <div className="card-image-wrapper">
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/products/553af994-244a-4b81-9d9e-9967a1b966b3_300x.png?v=1625046259"
            className="card-image-ecommerce"
            alt="tshirt"
          />
        </div>
        <div className="card-content-ecommerce">
          <div className="card-title">
            <strong>brand</strong>
          </div>
          <div className="card-subtitle">description</div>
          <hr />
          <div className="product-price-details">
            <div className="product-price">
              <strong>₹499</strong>
            </div>
            <div className="product-mrp">₹699</div>
            <div className="product-discount">(FLAT 20% OFF)</div>
          </div>
        </div>
      </div>
    </>
  );
};

export { CardProduct };
