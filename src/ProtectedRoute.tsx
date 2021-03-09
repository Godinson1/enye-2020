import React from "react";
import { Route, Redirect } from "react-router-dom";

//Configure protected route checking state for current logged in user
const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props: any) =>
        !!localStorage.getItem("authUser") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
