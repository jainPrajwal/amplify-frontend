import { useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { HamburgerMenu } from "./HamburgerMenu";
import { NavMenu } from "./NavMenu";
import { SearchBar } from "./searchbar/searchBar";

const Navbar = () => {
  const [mobileSideBar, setMobileSideBar] = useState(false);
  return (
    <>
      <div className="navbar d-flex">
        <div className="nav-actions d-flex ai-center pt-small pb-small">
          <HamburgerMenu status={{ mobileSideBar, setMobileSideBar }} />
          <BrandLogo />
          <div className="wrapper-search">
            <SearchBar />
          </div>
        </div>
        <nav className="nav-menu d-flex ai-center px-1 jc-space-between f-direction-row">
          <ul className="nav-menu-items d-flex ai-center f-direction-row">
            <li className="nav-menu-item">
              {" "}
              <a className="nav-menu-link search">
                <i class="fa fa-search" aria-hidden="true"></i> 
                <span className="font-sm">search</span>
              </a>
            </li>
            <li className="nav-menu-item">
              <a href="true" className="nav-menu-link">
                <i className="fas fa-sign-in-alt"></i>
                <div></div>
                <span className="font-sm">login</span>
              </a>
            </li>
            <li className="nav-menu-item">
              {" "}
              <a href="true" className="nav-menu-link wishlist">
                <i class="far fa-heart">
                    <span className="notification-count">10</span>
                </i>
                <div></div>
                <span className="font-sm">wishlist</span>
              </a>
            </li>
            <li className="nav-menu-item">
              {" "}
              <div className="nav-menu-link cart">
                <i className="fas fa-shopping-cart">
                     <span className="cart-count">10</span>
                </i>
                <div></div> <span className="font-sm">cart</span>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <NavMenu status={{ mobileSideBar, setMobileSideBar }} />
    </>
  );
};

export { Navbar };
