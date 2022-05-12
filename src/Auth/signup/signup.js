import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";
import "../auth.css";
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
      <div className="d-flex f-direction-row jc-space-around wrapper-login p-lg">
        <div
          style={{ maxWidth: "480px", backgroundColor: "#fef2f2" }}
          className="border-primary p-lg w-100"
        >
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
                <p className="ml-md">Invalid Username or Password</p>
              </div>
            )}

            <div className="form-container">
              <div className="form-title header header-secondary text-center">
                Sign up
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
                <button className="btn btn-danger">
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
            <span
              className="text-underline text-primary p-lg span-login"
              style={{
                color: "var(--kaali-danger)",
                textDecorationLine: "underline",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </span>
          </div>
        </div>
      </div>
      <div className="wrapper-svg-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#E6003D"
            fillOpacity="1"
            d="M0,288L80,277.3C160,267,320,245,480,229.3C640,213,800,203,960,213.3C1120,224,1280,256,1360,272L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </>
  );
};

export { SignUp };
