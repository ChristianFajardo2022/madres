import React, { useState } from "react";
import "./index.css";
import router from "./routes/Rutas";
import { Helmet } from "react-helmet";
import { RouterProvider } from "react-router-dom";
import LoadingEnd from "./componentes/Loading";

const App = () => {
  return (
    <>
      <Helmet>
        <title>Operación mayo</title>
        <link rel="canonical" href="/" />
        <meta name="description" content="Homenaje para todos las madres" />
      </Helmet>

      <>
        <RouterProvider router={router} />
      </>
    </>
  );
};

export default App;
