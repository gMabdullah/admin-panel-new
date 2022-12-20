import { lazy } from "react";
import { useRoutes } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import Loadable from "components/Loadable";

const LoginPage = Loadable(lazy(() => import("login/Login")));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([{ path: "/", element: <LoginPage /> }, MainRoutes]);
}
