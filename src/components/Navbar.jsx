import { useState } from "react";
import { useNavigate } from "react-router";
import { BrandLogo } from "./BrandLogo";
import { HamburgerMenu } from "./HamburgerMenu";
import { NavMenu } from "./NavMenu";
import { SearchBar } from "./searchbar/searchBar";

const Navbar = () => {
  const [mobileView, setMobileView] = useState({
    isSideBarHidden: true,
    isSearchBarHidden: true,
  });

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
              className="nav-menu-item"
              onClick={() => {
                setMobileView((prevState) => ({
                  ...prevState,
                  isSearchBarHidden: !prevState.isSearchBarHidden,
                }));
              }}
            >
              {" "}
              <a className="nav-menu-link search">
                <i className="fa fa-search" aria-hidden="true"></i> 
                <span className="font-sm">search</span>
              </a>
            </li>
            <li className="nav-menu-item">
              <a href="true" className="nav-menu-link login">
                <i className="fas fa-sign-in-alt"></i>
                <div></div>
                <span className="font-sm">login</span>
              </a>
            </li>
            <li className="nav-menu-item">
              {" "}
              <a
                onClick={() => navigate("/wishlist")}
                className="nav-menu-link wishlist"
              >
                <i className="far fa-heart">
                    <span className="notification-count">10</span>
                </i>
                <div></div>
                <span className="font-sm">wishlist</span>
              </a>
            </li>
            <li className="nav-menu-item">
              {" "}
              <div
                className="nav-menu-link cart"
                onClick={() => navigate("/cart")}
              >
                <i className="fas fa-shopping-cart">
                     <span className="cart-count">10</span>
                </i>
                <div></div> <span className="font-sm">cart</span>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <NavMenu status={{ mobileView, setMobileView }} />
    </>
  );
};

export { Navbar };
