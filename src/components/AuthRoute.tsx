import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface AutheRouteProps {
  children: JSX.Element;
}

export const AuthRoute = ({ children }: AutheRouteProps): JSX.Element => {
  const { isAuth } = useAppSelector((state) => state.user);

  return !isAuth ? children : <Navigate to='/mainScreen' replace />;
};
