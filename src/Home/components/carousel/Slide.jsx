const Slide = ({ isCurrent, takeFocus, image, id, title, children }) => {
  // let ref = useRef();

  return (
    <li
      // ref={ref}
      aria-hidden={!isCurrent}
      className="carousel-slide Slide"
      style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
    ></li>
  );
};

export { Slide };
