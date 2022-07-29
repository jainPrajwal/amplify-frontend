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
      <div className="featured-categories">
        <div className="header header-secondary text-center">Categories</div>
        <div className="card">
          <div className="card-container">
            {uniqueBrands.map((item) => {
              const { _id, brand } = item;
              console.log(
                `AUSA KIASE `,
                item.availableColors.find((color) => color.color === item.color)
              );
              return (
                <div
                  className="card-body"
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
                  <div className="card-item">
                    <div className="card-image-container">
                      <img
                        src={
                          item.availableColors.find(
                            (color) => color.color === item.color
                          )?.image || item.image
                        }
                        alt="card"
                        className="card-image"
                      />
                    </div>
                    <div className="p-md d-flex ai-center jc-center">
                      <div className="text-bold text-upper text-center">
                        {brand}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Home };
