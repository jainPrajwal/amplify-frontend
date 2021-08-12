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
    quantity,
  },
  cart,
}) => {
  return (
    <>
      <div className="card-itemCart-container d-flex mt-extra-large">
        <span className="btn-remove-from-cart header-secondary">&times;</span>
        <div className="card-itemCart-image-wrapper">
          <img src={image} alt={name} className="w-100 h-100" />
        </div>
        <div className="card-itemCart-content ml-medium w-100 py-small">
          <div className="card-itemCart-title text-primary fs-2 mb-small">
            {brand}
          </div>
          <div className="card-itemCart-subtitle text-small">{name}</div>
          <div className="card-itemCart-quantity-details mt-medium">
            <div className="card-itemCart-quantity d-flex ai-center fs-1">
              Quantity :
              <button className="btn-round">
                <span className="fs-1">+</span>
              </button>
              <span className="text-primary mx-1">{quantity}</span>
              <button className="btn-round">
                <div className="fs-1 sign-minus"></div>
              </button>
            </div>
          </div>
          <div className="itemCart-price-details d-flex mt-medium">
            <div className="itemCart-price mr-small">
              <strong>
                ₹
                {`${
                  offer === "70% bonanza"
                    ? parseInt(price - (price / 100) * 70)
                    : offer === "Save 50"
                    ? parseInt(price - 50)
                    : parseInt(price - 22)
                }`}
              </strong>
            </div>
            <div className="product-selling-price mr-medium">₹{price}</div>
            <div className="product-discount">({offer})</div>
          </div>
        </div>
      </div>
    </>
  );
};

export { CardItemInCart };
