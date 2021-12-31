import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerLogin from "../../assets/images/ShoppingBlue.svg";
import { useAuth } from "../../contexts/useAuth";

const SignUp = () => {
  const [userSignUpDetails, setUserSignUpDetails] = useState({
    name: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { signUpUserWithCredentials, status } = useAuth();

  const signupUser = async () => {
    await signUpUserWithCredentials(userSignUpDetails);
  };

  const handleValidation = ({ name, username, password }) => {
    console.log("vaildatin");
    if (!name) {
      setError("name field required");
      return false;
    }
    return true;
  };
  const SignUpHandler = (e) => {
    e.preventDefault();
    if (handleValidation(userSignUpDetails)) signupUser();
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex f-direction-row jc-space-around wrapper-login">
        <div className="w-100">
          {" "}
          <form onSubmit={(e) => SignUpHandler(e)} className="form">
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

            <div className="form-container">
              <div className="form-title header header-primary text-center">
                sign up
              </div>
              <div className="form-row">
                <input
                  type="text"
                  className="input input-email"
                  id="name"
                  onChange={(event) =>
                    setUserSignUpDetails((prevState) => ({
                      ...prevState,
                      name: event.target.value,
                    }))
                  }
                  required
                />
                <label htmlFor="name" className="label-name">
                  <span className="content-name">Name</span>
                </label>
              </div>
              {<div> Heleoo {error}</div>}
              <div className="form-row">
                <input
                  type="text"
                  pattern="^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+)(\.[a-z]{2,8})$"
                  title="Email is Invalid."
                  className="input input-email"
                  id="email"
                  onChange={(event) =>
                    setUserSignUpDetails((prevState) => ({
                      ...prevState,
                      username: event.target.value,
                    }))
                  }
                  required
                />
                <label htmlFor="email" className="label-name">
                  <span className="content-name">Email Id</span>
                </label>
              </div>
              <div className="form-row">
                 
                <input
                  type="password"
                  className="input input-password"
                  id="password"
                  onChange={(event) =>
                    setUserSignUpDetails((prevState) => ({
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
                  {" "}
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
                    "sign up"
                  )}
                </button>
              </div>
            </div>
          </form>
          <div className="d-flex jc-center ai-center">
            Already have an account?
            <button
              className="btn btn-danger"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
        <div className="d-flex ai-center pt-medium">
          <img src={BannerLogin} alt="banner" className="banner-login" />
        </div>
      </div>
    </>
  );
};

export { SignUp };
