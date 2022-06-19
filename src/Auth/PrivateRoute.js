import { Navigate, Route } from "react-router";
import { useAuth } from "./context/useAuth";

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
