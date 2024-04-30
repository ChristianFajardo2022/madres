import React, { useEffect } from "react";
import { createBrowserRouter, useLocation } from "react-router-dom";

import Home from "./Home";
import Onboarding from "./Onboarding";
import Grabadora from "./Grabadora";
import Formulario from "./Formulario";
import Administrador from "./Administrador";
import ErrorPage from "../404";
import Gracias from "./Gracias";

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
    path: "/administrador",
    element: (
      <>
        <ScrollToTopOnRouteChange />
        <Administrador />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/gracias",
    element: (
      <>
        <ScrollToTopOnRouteChange />
        <Gracias />
      </>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default router;
