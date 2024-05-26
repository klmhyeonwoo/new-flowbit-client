import CommunityPage from "@/app/community";
import PredictPage from "@/app/predict";
import GlobalLayout from "@/components/layout";
import {
  RouterProvider,
  createBrowserRouter,
  RouteObject,
} from "react-router-dom";
import SignIn from "@/app/signin/index.tsx";
import SignUp from "@/app/signup/index.tsx";
import Complete from "@/app/signup/complete/index.tsx";
import Consent from "@/app/signup/consent/index.tsx";

const routerChildren: RouteObject[] = [
  {
    path: "/",
    element: <PredictPage />,
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
