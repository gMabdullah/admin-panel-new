import { lazy } from "react";
import { useRoutes } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import Loadable from "components/Loadable";

const LoginPage = Loadable(lazy(() => import("login/Login")));

// business listing screen route
const BusinessListing = Loadable(
  lazy(() => import("business/BusinessListing"))
);

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    { path: "/", element: <LoginPage /> },
    { path: "/business", element: <BusinessListing /> },
    MainRoutes,
  ]);
}
