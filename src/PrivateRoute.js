import { Route } from "react-router-dom";
import { Navigate } from "react-router";
import { useAuth } from "./contexts/useAuth";
export function PrivateRoute({ path, ...props }) {
  const {
    loggedInUser: { token },
  } = useAuth();

  return token ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate replace to="/login" state={{ from: path }} />
  );
}
