import { CardItemInStore } from "../../Product/components/cards/CardItemInStore";
import { useProducts } from "../../Product/context/useProducts";

export const RelatedProducts = ({ product,setItemColor }) => {
  const {
    state: { store },
   
  } = useProducts();

  const relatedProducts = store.filter(
    (productInStore) =>
      productInStore.category === product.category &&
      productInStore._id !== product._id
  );
  return (
    relatedProducts?.length > 0 && (
      <div className="d-flex f-direction-col" style={{ marginBlock: `2rem` }}>
        <div className="header header-secondary text-center">
          Related Products
        </div>
        <div className="d-flex" style={{ gap: `2rem`, marginBlock: `2rem` }}>
          {relatedProducts.map((product) => {
            return (
              <div className="d-flex" key={product._id}>
                <CardItemInStore
                  product={product}
                  key={product._id}
                  store={store}
                  setItemColor={setItemColor}
                />
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};
