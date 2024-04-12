import React, { useEffect } from "react";
import { createBrowserRouter, useLocation } from "react-router-dom";

import Home from "./Home";
import Onboarding from "./Onboarding";
import Grabadora from "./Grabadora";
import Formulario from "./Formulario";
import Administrador from "./Administrador";
import ErrorPage from "../404";

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTopOnRouteChange />
        <Home />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/onboarding",
    element: (
      <>
        <ScrollToTopOnRouteChange />
        <Onboarding />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/grabar-audio",
    element: (
      <>
        <ScrollToTopOnRouteChange />
        <Grabadora />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/formulario",
    element: (
      <>
        <ScrollToTopOnRouteChange />
        <Formulario />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/administrador",
    element: (
      <>
        <ScrollToTopOnRouteChange />
        <Administrador />
      </>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default router;
