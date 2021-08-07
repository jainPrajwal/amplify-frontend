const IconButton = (props) => {
  return (
    <button
      className={`carousel-button ${props.children.props.className}`}
      {...props}
    ></button>
  );
};
export { IconButton };
