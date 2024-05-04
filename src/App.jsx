import React, { useState } from "react";
import "./index.css";
import router from "./routes/Rutas";
import { Helmet } from "react-helmet";
import { RouterProvider } from "react-router-dom";
import LoadingEnd from "./componentes/Loading";
import GlobalSiteTags from "./scriptTag/operacionmayo";

const App = () => {
  return (
    <>
      <Helmet>
        <title>Operación mayo</title>
        <link rel="canonical" href="/" />
        <meta name="description" content="Homenaje para todas las madres" />
      </Helmet>
      <GlobalSiteTags />
      <>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </>
    </>
  );
};

export default App;
