import { createContext } from "react";
import { useState } from "react";
import { useNotifications } from "../contexts/useNotifications";
import { v4 } from "uuid";
import { useLocation, useNavigate } from "react-router";
import { fakeAuthAPI, fakeSignUpAPI, users } from "../fakeAPI/fakeAuthAPI";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [status, setStatus] = useState("idle");
  const { dispatch: notificationDispatch } = useNotifications();
  const { state } = useLocation();
  const navigate = useNavigate();

  const loginUserWithCredentials = async (userLoginDetails) => {
    setStatus("loading");
    try {
      const user = await fakeAuthAPI(userLoginDetails);

      if (user) {
        if (user.password === userLoginDetails.password) {
          setLogin(true);
          setStatus("idle");
          notificationDispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: v4(),
              type: "SUCCESS",
              message: `Login Successful!`,
            },
          });
          if (state?.from) {
            navigate(`${state.from}`);
          } else navigate("/store");
        } else {
          setLogin(false);
          setStatus("error");
        }
      } else {
        setLogin(false);
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const signUpUserWithCredentials = async (userSignUpDetails) => {
    setStatus("loading");
    try {
      const users = await fakeSignUpAPI(userSignUpDetails);
      if (users) {
        setLogin(true);
        setStatus("idle");
        notificationDispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            id: v4(),
            type: "SUCCESS",
            message: `Sign Up Successful!`,
          },
        });
        state && state?.from ? navigate(`/${state.form}`) : navigate("/store");
      } else {
        setStatus("error");
        navigate("/store");
      }
    } catch (error) {
      setStatus("error");
      console.error(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        loginUserWithCredentials,
        status,
        signUpUserWithCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
