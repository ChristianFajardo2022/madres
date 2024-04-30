import React, { useState } from "react";
import "./index.css";
import router from "./routes/Rutas";
import { Helmet } from "react-helmet";
import { RouterProvider } from "react-router-dom";
import LoadingEnd from "./componentes/Loading";

const App = () => {
  console.log("Ancho de la pantalla: " + screen.width + "px");
  console.log("Altura de la pantalla: " + screen.height + "px");

  var aspectRatio = screen.width / screen.height;
  console.log("Relación de aspecto: " + aspectRatio.toFixed(2));

  return (
    <>
      <Helmet>
        <title>Operación mayo</title>
        <link rel="canonical" href="/" />
        <meta name="description" content="Homenaje para todas las madres" />
      </Helmet>

      <>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </>
    </>
  );
};

export default App;
