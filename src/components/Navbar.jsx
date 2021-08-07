import { useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { HamburgerMenu } from "./HamburgerMenu";
import { NavMenu } from "./NavMenu";
import { SearchBar } from "./searchbar/searchBar";

const Navbar = () => {
  const [mobileSideBar, setMobileSideBar] = useState(false);
  return (
    <>
      <div className="navbar d-flex ai-center pt-small pb-small">
        <HamburgerMenu status={{ mobileSideBar, setMobileSideBar }} />
        <BrandLogo />

        <nav className="nav-menu d-flex ai-center px-1 jc-space-between f-direction-row">
          <div className="wrapper-search">
            <SearchBar />
          </div>
          <ul className="nav-menu-items d-flex ai-center f-direction-row">
            <li className="nav-menu-item">
              <a href="true" className="nav-menu-link">
                <i className="fas fa-sign-in-alt"></i>
                <div className="font-sm">login</div>
              </a>
            </li>
            <li className="nav-menu-item p-extra-large">
              {" "}
              <a href="true" className="nav-menu-link">
                <i class="far fa-heart">
                    <span className="notification-count">10</span>
                </i>
                <div className="font-sm">wishlist</div>
              </a>
            </li>
            <li className="nav-menu-item p-extra-large">
              <a href="true" className="nav-menu-link">
                <i className="fas fa-shopping-cart">
                     <span className="cart-count">10</span>
                </i>
                 <div className="font-sm">store</div>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <NavMenu status={{ mobileSideBar, setMobileSideBar }} />
    </>
  );
};

export { Navbar };
