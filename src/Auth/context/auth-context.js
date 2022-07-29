import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { v4 } from "uuid";
import { useLocation, useNavigate } from "react-router";
import { useNotifications } from "../../Home/components/notification/context/useNotifications";
import { BASE_API } from "../../constants/api";
export const AuthContext = createContext();

export const setupAuthHeaderForServiceCalls = (token) => {
  if (token) return (axios.defaults.headers.common["Authorization"] = token);
  return null;
};

export const setupAuthExceptionHandler = (logout, navigate) => {
  const UNAUTHORIZED = [401, 500];
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (UNAUTHORIZED.includes(error?.response?.status)) {
        logout();
        navigate("/login");
        return Promise.reject(error);
      }
    }
  );
};

const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({
    userId: null,
    token: null,
  });
  const [status, setStatus] = useState("idle");
  const { dispatch: notificationDispatch } = useNotifications();
  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    if (user.token) {
      const bearerToken = `Bearer ${user.token}`;
      setupAuthHeaderForServiceCalls(bearerToken);
      setLoggedInUser(() => ({
        userId: user.userId,
        token: user.token,
      }));
    }
  }, []);

  useEffect(() => {
    setupAuthExceptionHandler(logout, navigate);
  }, []);

  const loginUserWithCredentials = async (userLoginDetails) => {
    setStatus("loading");
    try {
      const {
        data: { success, message, userId, token },
      } = await axios.post(`${BASE_API}/login`, userLoginDetails);

      if (token && success) {
        const bearerToken = `Bearer ${token}`;

        setupAuthHeaderForServiceCalls(bearerToken);
        localStorage.setItem("user", JSON.stringify({ userId, token }));
        setLoggedInUser(() => ({
          userId,
          token,
        }));
        setStatus("idle");
        notificationDispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            id: v4(),
            type: "SUCCESS",
            message,
          },
        });
        // loadCart();
        state && state?.from ? navigate(`${state.from}`) : navigate("/store");
      } else {
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
      // const users = await fakeSignUpAPI(userSignUpDetails);
      const {
        data: { success, user },
      } = await axios.post("`${BASE_API}`/signup", userSignUpDetails);

      if (success && user) {
        setStatus("idle");

        notificationDispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            id: v4(),
            type: "SUCCESS",
            message: `Sign Up Successful!Please Login to Continue :)`,
          },
        });
      } else {
        setStatus("error");
      }
      navigate("/login");
    } catch (error) {
      setStatus("error");
      console.error(error.response);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setLoggedInUser(() => ({ userId: null, token: null }));
  };
  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        loginUserWithCredentials,
        status,
        signUpUserWithCredentials,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
