import { useNavigate } from "react-router";

const Header = ({ title, subtitle }) => {
  let navigate = useNavigate();
  return (
    <div>
      <div className="wrapper-header">
        <div className="header header-primary text-white">
          <div>There is music...</div>
          <div> And then there is muuuusic...</div>
          <div> Experience the muuuusic with boAts' powerful Amplifiers!</div>
          <button
            className="btn btn-secondary text-primary"
            onClick={() => navigate("/store")}
          >
            Shop now!
          </button>
        </div>
        <div className="wrapper-image">
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Kartik_720x.jpg?v=1606303019"
            className="image-ad"
            alt="boat-buds"
          />
        </div>
      </div>
    </div>
  );
};

export { Header };
