import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../Auth/context/useAuth";
import { useCart } from "../../../Cart/context/useCart";
import { useWishlist } from "../../../Wishlist/context/useWishlist";
import { SearchBar } from "../searchbar/searchBar";
import { BrandLogo } from "./BrandLogo";
import { HamburgerMenu } from "./HamburgerMenu";
import { NavMenu } from "./NavMenu";
import "./navbar.css";

const activeStyle = {
  color: `var(--kaali-danger)`,
};

const Navbar = () => {
  const [mobileView, setMobileView] = useState({
    isSideBarHidden: true,
    isSearchBarHidden: true,
  });
  const [isPageActive, setPageActive] = useState("");
  const { state: wishlist } = useWishlist();
  const { loggedInUser, logout } = useAuth();
  const { state: cart } = useCart();

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <header className="navbar d-flex">
        <div className="nav-actions d-flex ai-center pt-small pb-small">
          <HamburgerMenu status={{ mobileView, setMobileView }} />
          <Link to="/">
            <BrandLogo />
          </Link>

          <div
            className={`wrapper-search ${
              mobileView.isSearchBarHidden ? "" : "wrapper-search-active"
            }`}
          >
            {
              <i
                className={`fas fa-arrow-left ${
                  mobileView.isSearchBarHidden ? "hide" : ""
                }`}
                onClick={() => {
                  setMobileView((prevState) => ({
                    ...prevState,
                    isSearchBarHidden: true,
                  }));
                }}
              ></i>
            }
            {(location?.pathname === "/store" ||
              location?.pathname === "/") && (
              <SearchBar status={{ mobileView, setMobileView }} />
            )}
          </div>
        </div>
        <nav className="nav-menu">
          <ul className="nav-menu-items">
            {(location?.pathname === "/store" ||
              location?.pathname === "/") && (
              <li
                className={`nav-menu-item item-search ${
                  isPageActive === "search" ? activeStyle : ""
                }`}
                onClick={() => {
                  setPageActive("search");
                  setMobileView((prevState) => ({
                    ...prevState,
                    isSearchBarHidden: !prevState.isSearchBarHidden,
                  }));
                }}
              >
                <div className="nav-menu-link search">
                  <div className="text-center">
                    <i className="fa fa-search fa-fw" aria-hidden="true"></i> 
                    <div className="text-center">search</div>
                  </div>
                </div>
              </li>
            )}

            {!loggedInUser.token ? (
              <li className={`nav-menu-item`}>
                <NavLink
                  end
                  className="h-100"
                  activeStyle={activeStyle}
                  to="/login"
                >
                  <div className="nav-menu-link login">
                    <div>
                      <i className="fas fa-sign-in-alt fa-fw"></i>
                    </div>
                    <div className="text-center">login</div>
                  </div>
                </NavLink>
              </li>
            ) : (
              <li
                className={`nav-menu-item  ${
                  isPageActive === "login" ? "nav-menu-item-active" : ""
                }`}
                onClick={() => {
                  logout();
                  navigate("/store");
                }}
              >
                <div className="nav-menu-link login">
                  <div>
                    <i className="fas fa-sign-in-alt fa-fw"></i>
                  </div>
                  <div className="text-center">logout</div>
                </div>
              </li>
            )}
            <li className={`nav-menu-item`}>
              <NavLink
                end
                className="h-100"
                activeStyle={activeStyle}
                to="/wishlist"
                // target={`_blank`}
              >
                <div className="nav-menu-link  fa-fw">
                  <div>
                    <i className="far fa-heart">
                      {loggedInUser.token && (
                        <span className="cart-count">{wishlist?.length}</span>
                      )}
                    </i>
                  </div>

                  <div className="text-center">wishlist</div>
                </div>
              </NavLink>
            </li>
            <li className={`nav-menu-item`}>
              <NavLink
                end
                activeStyle={activeStyle}
                to="/cart"
                className="h-100"
                // target={`_blank`}
              >
                <div className="nav-menu-link">
                  <div>
                    <i className="fas fa-shopping-cart fa-fw">
                      {loggedInUser.token && (
                        <span className="notification-count">
                          {cart?.reduce((acc, current) => {
                            return (acc += current?.totalQuantity);
                          }, 0)}
                        </span>
                      )}
                    </i>
                  </div>

                  <div className="text-center">cart</div>
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <NavMenu status={{ mobileView, setMobileView }} />
    </>
  );
};

export { Navbar };
