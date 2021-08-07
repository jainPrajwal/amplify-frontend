const NavMenu = ({ status: { mobileSideBar, setMobileSideBar } }) => {
  return (
    <>
      <div
        className={`${
          mobileSideBar === true ? "modal-bg  modal-bg-active" : ""
        }`}
      >
        <nav className={`nav-mob-menu ${mobileSideBar ? "active" : ""}`}>
          <ul className="nav-mob-menu-items">
            <li className="icon-close-wrapper nav-mob-menu-item">
              <span
                className="icon-close"
                onClick={() => setMobileSideBar(false)}
              >
                &times;
              </span>
            </li>
            <hr />
            <li className="icon-login nav-mob-menu-item">
              <a href="true">
                <i className="fas fa-sign-in-alt"></i> Log In
              </a>
            </li>
            <hr style={{ overflow: "hidden" }} />
            <li className="icon-wishlist nav-mob-menu-item">
              <a href="true">
                <i className="fas fa-store"></i>
                My WishList
              </a>
            </li>
            <hr />
            <li className="icon-cart nav-mob-menu-item">
              <a href="true">
                <i className="fas fa-shopping-cart"></i>
                My Cart
              </a>
            </li>
            <hr />
          </ul>
        </nav>
      </div>
    </>
  );
};

export { NavMenu };
