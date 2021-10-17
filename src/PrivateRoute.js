import { Route } from "react-router-dom";
import { Navigate } from "react-router";
export function PrivateRoute({ path, ...props }) {
  const login = false;
  if (login) {
    return <Route path={path} {...props} />;
  } else {
    return <Navigate replace to="/login" state={{ from: path }} />;
  }
}
