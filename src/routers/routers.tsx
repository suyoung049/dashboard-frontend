import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login/login";
import { Home } from "../pages/home/Home";
import { Profile } from "../pages/profile/profile";

const routers: RouteObject[] = [
  { path: "/", element: <Login /> },
  { path: "/home", element: <Home /> },
  { path: "/profile", element: <Profile /> },
];

export const Routers = createBrowserRouter(routers);
