const HamburgerMenu = ({ status: { setMobileSideBar } }) => {
  return (
    <i
      className="fas fa-bars hamburger"
      onClick={() => setMobileSideBar(true)}
    ></i>
  );
};

export { HamburgerMenu };
