import { lazy } from "react";
import { useRoutes } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import LoginRoutes from "./LoginRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import Loadable from "components/Loadable";

const PagesLanding = Loadable(lazy(() => import("login/Login")));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    { path: "/", element: <PagesLanding /> },
    // AuthenticationRoutes,
    // LoginRoutes,
     MainRoutes,
  ]);
}
