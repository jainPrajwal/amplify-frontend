import { Loader } from "kaali-ui";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";

import { useProducts } from "../Product/context/useProducts";

import { MyCarousel } from "./components/carousel/MyCarousel";
import { Header } from "./components/Header";

const Home = () => {
  const { state, dispatch } = useProducts();

  const navigate = useNavigate();

  // Make the value of category as the key and the original object as its value
  // Put it into the map as map does not consider duplicate keys.
  // Finally get its values.
  const uniqueBrands = [
    ...new Map(state.store.map((item) => [item[`brand`], item])).values(),
  ];

  return (
    <div className="">
      <MyCarousel />
      <Header />
      <section className="featured-categories">
        <div className="header header-secondary text-center">Categories</div>
        {state.status === `idle` ? (
          <div className="card p-lg m-lg" style={{ marginBlock: `2rem` }}>
            <div className="d-flex f-wrap jc-center gap-10" s>
              {uniqueBrands.map((item) => {
                const { _id, brand } = item;

                return (
                  <article
                    className="card-body"
                    style={{ width: `210px` }}
                    key={_id}
                    onClick={() => {
                      dispatch({
                        type: "CLEAR_ALL",
                      });
                      navigate({
                        pathname: `/store`,
                        search: `?${createSearchParams({
                          brand,
                        })}`,
                      });
                    }}
                  >
                    <div className="card-item" style={{ margin: `0 auto` }}>
                      <div>
                        <img
                          src={
                            item.availableColors.find(
                              (color) => color.color === item.color
                            )?.image || item.image
                          }
                          alt="card"
                          className="w-100"
                        />
                      </div>
                      <div className="p-md d-flex ai-center jc-center">
                        <div className="text-bold text-upper text-center">
                          {brand}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : state.status === `loading` ? (
          <div className="d-flex jc-center m-lg p-lg">
            <Loader borderTopColor={`var(--kaali-danger)`} />
          </div>
        ) : (
          <>Somehting went wrong..!</>
        )}
      </section>
    </div>
  );
};

export { Home };
