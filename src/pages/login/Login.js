import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import BannerLogin from "../../assets/images/Shopping.svg";

const Login = () => {
  const { loginUserWithCredentials } = useAuth();
  const [status, setStatus] = useState("idle");

  const [userLoginDetails, setUserLoginDetails] = useState({
    email: "",
    password: "",
  });

  const { state } = useLocation();
  const navigate = useNavigate();

  const checkCredentials = async () => {
    setStatus("loading");

    (await loginUserWithCredentials(userLoginDetails))
      ? setStatus("idle")
      : setStatus("error");
    if (state?.from) {
      navigate(`${state.from}`);
    } //else navigate("/store");
  };
  const LoginHandler = (e) => {
    e.preventDefault();

    // checkCredentials();
  };

  return (
    <>
      {status === "error" && (
        <div className="red d-flex jc-center ai-center">
          <img
            src="https://icon-library.com/images/error-icon-transparent/error-icon-transparent-24.jpg"
            alt=""
            height="25px"
            width="25px"
          />
          <p className="ml-medium">{"Invalid Username or Password"}</p>
        </div>
      )}
      <div className="d-flex f-direction-row jc-space-around wrapper-login">
        <div className="w-100">
          <form onSubmit={(e) => LoginHandler(e)} className="form">
            <div className="form-container">
              <div className="form-title header header-primary text-center">
                sign in
              </div>
              <div className="form-row">
                <input
                  type="email"
                  className="input input-email"
                  id="Email"
                  onChange={(event) =>
                    setUserLoginDetails((prevState) => ({
                      ...prevState,
                      email: event.target.value,
                    }))
                  }
                  required
                />
                <label htmlFor="Email" className="label-name">
                  <span className="content-name">Email Id</span>
                </label>
              </div>
              <div className="form-row">
                 
                <input
                  type="password"
                  className="input input-password"
                  id="password"
                  onChange={(event) =>
                    setUserLoginDetails((prevState) => ({
                      ...prevState,
                      password: event.target.value,
                    }))
                  }
                  required
                />
                 
                <label htmlFor="password" className="label-name">
                   <span className="content-name">Password</span>
                </label>
              </div>
              <div className="d-flex jc-center">
                <button className="btn btn-primary btn-input">
                  {}
                  {status === "loading" ? (
                    <>
                      <img
                        src="https://www.circuit-booking.com/themes/basic/assets/images/dot-progress.gif"
                        alt="loading"
                        width="50px"
                        height="12px"
                      />
                    </>
                  ) : (
                    "sign in"
                  )}
                </button>
              </div>
            </div>
          </form>
          <Link to="/signup">
            <div className="d-flex jc-center ai-center">
              Not Registered yet?
              <button className="btn btn-danger">sign up</button>
            </div>
          </Link>
        </div>
        <div className="d-flex ai-center pt-medium">
          <img src={BannerLogin} alt="image" className="banner-login" />
        </div>
      </div>
    </>
  );
};

export { Login };
