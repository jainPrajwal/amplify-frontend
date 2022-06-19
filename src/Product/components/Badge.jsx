const Badge = ({ fastDelivery }) => {
  return (
    <div className="tag tag-bestSeller">
      <span className="glow">&nbsp;</span>
      {`${fastDelivery ? "fast Delivery" : ""}`}
    </div>
  );
};

export { Badge };
