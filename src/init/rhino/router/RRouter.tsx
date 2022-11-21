import { ElementType, lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// ----------------------------------------------------------------------

export default function RRouter() {
  return useRoutes([
    {
      path: "",
      children: [{ path: "", element: <Home /> }],
    },
  ]);
}

const Home = lazy(() => import("../../pages/Home"));
