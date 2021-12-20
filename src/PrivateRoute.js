import { Route } from "react-router-dom";
import { Navigate } from "react-router";
import { useAuth } from "./contexts/useAuth";
export function PrivateRoute({ path, ...props }) {
  const { login } = useAuth();
  console.log("login", { login });
  return login ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate replace to="/login" state={{ from: path }} />
  );
}
