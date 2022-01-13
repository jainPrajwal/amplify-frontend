const SlideNavItem = ({ isCurrent, ...props }) => {
  return (
    <li className="carousel-nav-item">
      <button
        className={`carousel-indicator ${isCurrent ? "current-slide" : ""}`}
        {...props}
        aria-current={isCurrent}
      ></button>
    </li>
  );
};

export { SlideNavItem };
