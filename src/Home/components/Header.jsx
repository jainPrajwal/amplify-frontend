import { useNavigate } from "react-router";
import  MusicBanner  from "../../assets/images/MusicBanner.png";

import "./header.css";
const Header = ({ title, subtitle }) => {
  let navigate = useNavigate();
  return (
    <div>
      <div className="wrapper-header">
        <div className="header header-primary header-amplify">
          <div className="red text-upper"> muuuusic...</div>
          <div>
            {" "}
            To fill your{" "}
            <span className="red text-upper" style={{ fontFamily: `inherit` }}>
              he<span role="img" className="">❤</span>rt!
            </span>
          </div>
          <button
            className="btn btn-danger text-primary"
            onClick={() => navigate("/store")}
          >
            <span className=" text-upper"> Shop now! </span>
          </button>
        </div>
        <div className="wrapper-image">
          <img
            src={MusicBanner}
            className="image-ad"
            alt="boat-buds"
            style={{filter:`drop-shadow(6px 6px 6px pink)`}}
          />
        </div>
      </div>
    </div>
  );
};
/*
<a href="https://storyset.com/love">Love illustrations by Storyset</a>*/
export { Header };
