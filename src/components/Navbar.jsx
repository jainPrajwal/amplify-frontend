import { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../contexts/useCart";
import { useWishlist } from "../contexts/useWishlist";
import { BrandLogo } from "./BrandLogo";
import { HamburgerMenu } from "./HamburgerMenu";
import { NavMenu } from "./NavMenu";
import { SearchBar } from "./searchbar/searchBar";
import { useAuth } from "../contexts/useAuth";
import { NavLink } from "react-router-dom";

const activeStyle = {
  borderBottom: `2px solid var(--red)`,
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

  let navigate = useNavigate();

  return (
    <>
      <div className="navbar d-flex">
        <div className="nav-actions d-flex ai-center pt-small pb-small">
          <HamburgerMenu status={{ mobileView, setMobileView }} />
          <BrandLogo />

          <div
            className={`wrapper-search ${
              mobileView.isSearchBarHidden ? "" : "wrapper-search-active"
            }`}
          >
            <i
              className={`fas fa-arrow-left ${
                mobileView.isSearchBarHidden ? "hide" : ""
              }`}
              onClick={() => {
                setMobileView((prevState) => ({
                  ...prevState,
                  isSearchBarHidden: !prevState.isSearchBarHidden,
                }));
              }}
            ></i>
            <SearchBar status={{ mobileView, setMobileView }} />
          </div>
        </div>
        <nav className="nav-menu d-flex ai-center px-1 jc-space-between f-direction-row">
          <ul className="nav-menu-items d-flex ai-center f-direction-row">
            <li
              className={`nav-menu-item item-search ${
                isPageActive === "search" ? "nav-menu-item-active" : ""
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
                <i className="fa fa-search" aria-hidden="true"></i> 
                <span className="font-sm">search</span>
              </div>
            </li>

            {/*  */}
            <NavLink end activeStyle={activeStyle} to="/store">
              <li className={`nav-menu-item item-store`}>
                <div className="nav-menu-link store">
                  <i className="fas fa-store" aria-hidden="true"></i> 
                  <span className="font-sm">store</span>
                </div>
              </li>
            </NavLink>

            {!loggedInUser.token ? (
              <NavLink end activeStyle={activeStyle} to="/login">
                <li className={`nav-menu-item item-login`}>
                  <div className="nav-menu-link login">
                    <div
                      onClick={() => {
                        setPageActive("login");
                        navigate("/login");
                      }}
                    >
                      <i className="fas fa-sign-in-alt"></i>
                      <div></div>
                      <span className="font-sm">login</span>
                    </div>
                  </div>
                </li>
              </NavLink>
            ) : (
              <li
                className={`nav-menu-item item-login ${
                  isPageActive === "login" ? "nav-menu-item-active" : ""
                }`}
              >
                <div className="nav-menu-link login">
                  <div
                    onClick={() => {
                      logout();
                    }}
                  >
                    <i className="fas fa-sign-in-alt"></i>
                    <div></div>
                    <span className="font-sm">logout</span>
                  </div>
                </div>
              </li>
            )}
            <NavLink end activeStyle={activeStyle} to="/wishlist">
              <li className={`nav-menu-item item-wishlist`}>
                <div className="nav-menu-link wishlist">
                  <i className="far fa-heart">
                    {loggedInUser.token && (
                      <span className="cart-count">{wishlist?.length}</span>
                    )}
                  </i>
                  <div></div>
                  <span className="font-sm">wishlist</span>
                </div>
              </li>
            </NavLink>
            <NavLink
              end
              activeStyle={activeStyle}
              to="/cart"
              style={{ marginTop: "auto"}}
            >
              <li className={`nav-menu-item item-cart`}>
                <div className="nav-menu-link cart" style={{maxHeight:"46px"}}>
                  <i className="fas fa-shopping-cart">
                    {loggedInUser.token && (
                      <span className="notification-count">
                        {cart?.reduce((acc, current) => {
                          return (acc += current?.totalQuantity);
                        }, 0)}
                      </span>
                    )}
                  </i>
                  <div>
                    <span className="font-sm">cart</span>
                  </div>
                   
                </div>
              </li>
            </NavLink>
          </ul>
        </nav>
      </div>
      <NavMenu status={{ mobileView, setMobileView }} />
    </>
  );
};

export { Navbar };
