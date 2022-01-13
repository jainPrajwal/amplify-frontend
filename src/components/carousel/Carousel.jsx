const Carousel = ({ timerObj, ...props }) => {
  const handlePauseTimer = () => {
    
    clearInterval(timerObj.timer);
  };

  return (
    <section
      onMouseEnter={() => handlePauseTimer()}
      onMouseLeave={() => timerObj.handleStartTimer()}
      className="carousel"
      {...props}
    ></section>
  );
};

export { Carousel };
