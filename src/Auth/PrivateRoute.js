import { Navigate, Route } from "react-router";
import { useAuth } from "./context/useAuth";

export function PrivateRoute({ path, ...props }) {
  const {
    loggedInUser: { token },
  } = useAuth();

  const localToken = JSON.parse(localStorage.getItem(`user`))?.token;

  return token || localToken ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate replace to="/login" state={{ from: path }} />
  );
}
