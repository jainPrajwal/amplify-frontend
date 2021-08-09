import { CardProduct } from "../../components";
import { ContainerEcommerce } from "../../components";
const Store = () => {
  return (
    <>
      <div
        className="header header-secondary text-center"
        style={{ color: "black" }}
      >
        Welcome to our Store!
      </div>
      <div className="grid-sidebar">
        <div className="container-sidebar-desktop">
          <div className="sidebar">
            <ul className="sidebar-list">
              <li className="sidebar-list-items">Hey</li>
              <li className="sidebar-list-items">Hey</li>
              <li className="sidebar-list-items">Hey</li>
              <li className="sidebar-list-items">Hey</li>
              <li className="sidebar-list-items">Hey</li>
              <li className="sidebar-list-items">Hey</li>
              <li className="sidebar-list-items">Hey</li>
              <li className="sidebar-list-items">Hey</li>
              <li className="sidebar-list-items">Hey</li>
              <li className="sidebar-list-items">Hey</li>
            </ul>
          </div>
        </div>
        <div className="container-main px-1">
          <ContainerEcommerce>
            <CardProduct />
          </ContainerEcommerce>
        </div>
      </div>
    </>
  );
};
export { Store };
