const HamburgerMenu = ({ status: { setMobileView } }) => {
  return (
    <i
      className="fas fa-bars hamburger"
      onClick={() =>
        setMobileView((prevState) => {
          return { ...prevState, isSideBarHidden: !prevState.isSideBarHidden };
        })
      }
    ></i>
  );
};

export { HamburgerMenu };
