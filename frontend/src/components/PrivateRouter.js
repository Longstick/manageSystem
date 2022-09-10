import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogined } from "../utils/session";
 
const PrivateRouter = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={
        (routePrpos) =>
          isLogined() ? <Component {...routePrpos} /> : <Redirect to="/" />
      }
    />
  );
};
 
export default PrivateRouter;