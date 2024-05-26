import CommunityPage from "@/app/community";
import PredictPage from "@/app/predict";
import GlobalLayout from "@/components/layout";
import {
  RouterProvider,
  createBrowserRouter,
  RouteObject,
} from "react-router-dom";

import SignIn from "@/app/signin";
import SignUp from "@/app/signup";
import Complete from "@/app/signup/complete";
import Consent from "@/app/signup/consent";
import HomePage from "@/app/home";

const routerChildren: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/predict",
    element: <PredictPage />,
  },
  {
    path: "/community",
    element: <CommunityPage />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/consent",
    element: <Consent />,
  },
  {
    path: "/complete",
    element: <Complete />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: routerChildren,
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};
