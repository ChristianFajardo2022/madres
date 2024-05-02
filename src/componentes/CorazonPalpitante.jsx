import React from "react";
import ToltipCorazon from "./ToltipCorazon";

const CorazonPalpitante = ({ handleClick, botonAudio }) => {
  return (
    <>
      <span className="Oprime">
        <ToltipCorazon />
      </span>
      <span
        onClick={handleClick}
        className={`corazonOso ${
          botonAudio
            ? "cursor-pointer pointer-events-all"
            : "pointer-events-none"
        } lg:w-48 xs:w-32 lg:h-48 xs:h-auto absolute lg:left-[52%] xs:left-[52%] sm:left-[50%] lg:top-[49%] sm:top-[58%] xs:top-[50%] translate-x-[-50%]`}
      >
        <img
          className="xs:w-[70%] lg:w-[80%] floatcenter h-auto"
          src="/imagenes/imagenPruebaCorazon.webp"
          alt=""
        />
        <svg
          className=""
          id="uuid-b955aa7a-8f2c-432f-a962-78b2700df48c"
          data-name="Capa 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 167.49 156"
        >
          <path
            className="path1 opacity-0"
            d="m51.34,15.46c20.7-.81,30.81,11.87,32.58,12.07,1.92.21,12.89-14.31,35.59-11.76,17.33,1.94,32.81,16.96,34.24,34.54,2.82,34.83-41.46,74.85-69.22,91.24-2.05.23-17.59-11.24-20.21-13.27C39.16,108.72-2.51,64.95,21.63,31.6c6.68-9.23,18.31-15.69,29.71-16.14Z"
            style={{
              fill: "none",
              stroke: "#fdefd1",
              strokeMiterlimit: 10,
              strokeWidth: "2px",
            }}
          />

          <path
            className="path2 opacity-0"
            d="m48.27,9.15c1.34-.05,8.51-.47,17.27,2.46,8.9,2.97,14.99,7.87,18.27,10.95,3.39-3.18,10.14-8.66,20.17-11.53.41-.12,9.99-2.53,18.65-1.54,18.9,2.16,35.79,18.84,37.34,38.37,3.07,38.7-45.22,83.16-75.51,101.38-2.23.25-19.19-12.49-22.04-14.75C34.98,112.77-10.47,64.13,15.86,27.08c7.29-10.25,19.98-17.43,32.41-17.93Z"
            style={{
              fill: "none",
              stroke: "#fdefd1",
              strokeMiterlimit: 10,
              strokeWidth: "1.5px",
            }}
          />

          <path
            className="path3 opacity-0"
            d="m45.45,2.31c1.44-.06,9.12-.51,18.5,2.68,9.54,3.24,16.06,8.57,19.57,11.91,3.63-3.46,10.86-9.42,21.61-12.55.44-.13,10.7-2.75,19.99-1.68,20.25,2.35,38.35,20.51,40.01,41.76,3.29,42.11-48.46,90.5-80.91,110.32-2.39.28-20.56-13.59-23.62-16.05C31.21,115.08-17.5,62.15,10.72,21.82,18.53,10.67,32.13,2.85,45.45,2.31Z"
            style={{
              fill: "none",
              stroke: "#fdefd1",
              strokeMiterlimit: 10,
              strokeWidth: "1px",
            }}
          />
        </svg>
      </span>
    </>
  );
};

export default CorazonPalpitante;
