import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";
import "../auth.css";
const Login = () => {
  const { loginUserWithCredentials, status } = useAuth();

  const [userLoginDetails, setUserLoginDetails] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const LoginHandler = async (e) => {
    e.preventDefault();
    await loginUserWithCredentials(userLoginDetails);
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
          <p className="ml-medium">Invalid Username or Password</p>
        </div>
      )}
      <div className="d-flex f-direction-column jc-space-around wrapper-login p-extra-large">
        <div
          style={{ maxWidth: "480px", backgroundColor: "#fef2f2" }}
          className="border-primary p-large w-100"
        >
          <form onSubmit={(e) => LoginHandler(e)} className="form">
            <div className="form-container">
              <div className="form-title header header-secondary text-center">
                {`Sign in`}
              </div>
              <div className="form-row">
                <input
                  type="email"
                  className="input input-email"
                  id="Email"
                  onChange={(event) =>
                    setUserLoginDetails((prevState) => ({
                      ...prevState,
                      username: event.target.value,
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
                <button className="btn btn-danger">
                  {status === "loading" ? (
                    <>
                      <img
                        src="https://c.tenor.com/NqKNFHSmbssAAAAi/discord-loading-dots-discord-loading.gif"
                        alt="loading"
                        width="50px"
                        height="12px"
                      />
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </div>
          </form>

          <div className="d-flex jc-center ai-center">
            Not Registered yet?
            <span
              className="text-underline text-primary p-large span-signup"
              style={{ color: "var(--red)", textDecorationLine: "underline" }}
              onClick={() => navigate("/signup")}
            >{`Sign up`}</span>
          </div>
        </div>
      </div>
      <div className="wrapper-svg-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#E6003D"
            fill-opacity="1"
            d="M0,288L80,277.3C160,267,320,245,480,229.3C640,213,800,203,960,213.3C1120,224,1280,256,1360,272L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </>
  );
};

export { Login };
