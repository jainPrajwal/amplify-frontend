import { useEffect, useReducer, useState } from "react";
import { Carousel } from "./components/carousel/Carousel";
import { Controls } from "./components/carousel/Controls";
import { IconButton } from "./components/carousel/IconButton";
import { LeftArrowImage } from "./components/carousel/LeftArrowImage";
import { reducerCallbackFunction } from "./components/carousel/ReducerCarousel";
import { RightArrowImage } from "./components/carousel/RightArrowImage";
import { Slide } from "./components/carousel/Slide";
import { SlideNav } from "./components/carousel/SlideNav";
import { SlideNavItem } from "./components/carousel/SlideNavItem";
import { Slides } from "./components/carousel/Slides";
import { slides } from "./components/carousel/slides/slides";
import { Header } from "./components/Header";

const Home = () => {
  const [timer, setTimer] = useState(null);
  const [state, dispatch] = useReducer(reducerCallbackFunction, {
    currentIndex: 0,
  });

  const handleStartTimer = () => {
    const intervalId = setInterval(() => {
      dispatch({
        type: "NEXT",
      });
    }, 5000);
    setTimer(intervalId);
  };
  useEffect(() => {
    handleStartTimer();
  }, []);
  useEffect(() => () => clearInterval(timer), [timer]);
  return (
    <>
      <Carousel timerObj={{ timer, setTimer, handleStartTimer }}>
        <Slides>
          {slides.map((image, index) => {
            return (
              <Slide
                key={index}
                id={`image-${index}`}
                image={image.img}
                title={image.title}
                isCurrent={index === state.currentIndex}
                takeFocus={state.takeFocus}
                children={image.content}
              />
            );
          })}
        </Slides>

        <SlideNav>
          {slides.map((image, index) => {
            return (
              <SlideNavItem
                key={index}
                isCurrent={index === state.currentIndex}
                onClick={() => {
                  dispatch({ type: "GOTO", payload: index });
                }}
              />
            );
          })}
        </SlideNav>

        <Controls>
          <IconButton
            arial-label="Previous Slide"
            children={<LeftArrowImage className="carousel-button-left" />}
            onClick={() => dispatch({ type: "PREV" })}
          />
          <IconButton
            arial-label="Next Slide"
            children={<RightArrowImage className="carousel-button-right" />}
            onClick={() => dispatch({ type: "NEXT" })}
          />
        </Controls>
      </Carousel>
      <Header />
    </>
  );
};

export { Home };
