import React, { useEffect, useState } from "react";
import IconoLoader from "./IconoLoader";
import IconoLoaderSoldado from "./IconoLoaderSoldado";

const LoadingEnd = ({ elemtCargado, soldado }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Verificamos si el elemento está cargado antes de iniciar el intervalo
    if (elemtCargado) {
      // Calculamos el intervalo para que el incremento sea cada 50 ms
      const interval = setInterval(() => {
        setPercentage((oldPercentage) => {
          if (oldPercentage >= 100) {
            clearInterval(interval);
            return 100;
          }
          // Incrementamos 1% cada 50 ms
          return oldPercentage + 1;
        });
      }, 10); // Ajustamos a 50 ms para cumplir con el tiempo deseado

      return () => clearInterval(interval); // Limpieza al desmontar
    }
  }, [elemtCargado]); // Agregamos elemtCargado como dependencia

  return (
    <div className="loading w-full h-full bg-[#0c0c0c] flex items-center fixed z-[15000] justify-center">
      <span className="lg:w-96 lg:h-96 xs:w-72 xs:h-72">
        {soldado ? (
          <IconoLoaderSoldado texto={percentage} />
        ) : (
          <IconoLoader texto={percentage} />
        )}
      </span>
    </div>
  );
};

export default LoadingEnd;
