import React, { useEffect, useState } from "react";
import IconoLoader from "../../public/svg/iconoLoader";

const LoadingEnd = ({ elemtCargado }) => {
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
    <div className="loading w-full h-full bg-[--yellow] flex items-center fixed z-[150] justify-center">
      <span className="lg:w-80 lg:h-78 xs:w-72 xs:h-72">
        <IconoLoader texto={percentage} />
      </span>
    </div>
  );
};

export default LoadingEnd;
