import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BannerLogin from "../../assets/images/ShoppingBlue.svg";

const SignUp = () => {
  const [userSignUpDetails, setUserSignUpDetails] = useState({});
  const navigate = useNavigate();

  const signupUser = async () => {
    try {
      const response = await axios.post(
        `https://fruitBasketWithMongo2.prajwaljain.repl.co/user/signup`,
        {
          username: userSignUpDetails.username,
          password: userSignUpDetails.password,
        }
      );
      navigate("/login");
    } catch (err) {
      console.log("something is wrong..!", err);
    }
  };
  const SignUpHandler = (e) => {
    e.preventDefault();

    // signupUser();
  };

  return (
    <>
      <div className="d-flex f-direction-row jc-space-around wrapper-login">
        <div className="w-100">
          {" "}
          <form onSubmit={(e) => SignUpHandler(e)} className="form">
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
              <div className="form-row">
                <input
                  type="text"
                  className="input input-email"
                  id="email"
                  onChange={(event) =>
                    setUserSignUpDetails((prevState) => ({
                      ...prevState,
                      email: event.target.value,
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
                <button className="btn btn-primary btn-input"> sign up</button>
              </div>
            </div>
          </form>
          <Link to="/login">
            <div className="d-flex jc-center ai-center">
              Already have an account?
              <button className="btn btn-danger">Login</button>
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

export { SignUp };
