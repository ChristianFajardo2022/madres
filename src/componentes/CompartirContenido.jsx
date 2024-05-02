import React from "react";
import {
  TwitterShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from "react-share";
import LoadVideo from "./LoadVideo";
import {
  full,
  laptop,
  minilaptop,
  mobile,
  tablet,
} from "../helpers/medidasResponsive";

function CompartirContenido({ texto, url }) {
  const compartirConWebShareAPI = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Compartir",
          text: texto,
        })
        .then(() => console.log("Contenido compartido exitosamente"))
        .catch((error) => console.error("Error al compartir:", error));
    } else {
      console.log(
        "Web Share API no soportada, usando la biblioteca react-share."
      );
    }
  };

  const copiarUrl = () => {
    const el = document.createElement("textarea");
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert("La URL se ha copiado. compartela en facebook o donde quieras!");
  };

  return (
    <div className="flex flex-col lg:w-2/4 sm:w-1/2 xs:w-full h-full text-6xl flexCenter">
      <div className="w-full rotate-180 gradiente h-screen absolute z-[2]"></div>

      {full || laptop || minilaptop ? (
        <LoadVideo
          customStyle={"absolute bottom-0 left-0 z-[1]"}
          url={"/videos/backComparte.mp4"}
          loop={true}
        />
      ) : (
        <span className="w-full h-full absolute">
          <img src="/imagenes/bg-Compartir.webp" alt="" />
        </span>
      )}

      <h2 className="z-10 lg:text-5xl xs:text-4xl w-96 text-center">
        Comparte con tus contactos
      </h2>
      <div className="flex w-96 items-center justify-between mt-6 mb-16 z-10">
        <div className="line"></div>
        <div className="flexCenter w-4/12 h-12">
          <span className="w-8 h-8 inline-block">
            <img src="/svg/estrella.svg" alt="" />
          </span>
        </div>
        <div className="line"></div>
      </div>

      <div className="flex  justify-between items-center  w-96 z-10 max-lg:flex-wrap">
        <WhatsappShareButton title={texto}>
          <span className="iconSocial3 w-20 h-20 inline-block">
            <svg
              className="whtIcon"
              id="uuid-c6ece4b6-9fce-4dd7-815a-dab76ccf3f76"
              data-name="Capa 2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 46.66 46.66"
            >
              <g
                id="uuid-8b5c292d-d09f-47ee-87e2-6bd280b30373"
                data-name="Capa 5"
              >
                <path
                  className="border1"
                  d="m10.52.5h25.62c5.53,0,10.02,4.49,10.02,10.02v25.61c0,5.53-4.49,10.03-10.03,10.03H10.52c-5.53,0-10.02-4.49-10.02-10.02V10.52C.5,4.99,4.99.5,10.52.5Z"
                  style={{ strokeWidth: "0px" }}
                />
                <path
                  className="border2"
                  d="m10.52.5h25.62c5.53,0,10.02,4.49,10.02,10.02v25.61c0,5.53-4.49,10.03-10.03,10.03H10.52c-5.53,0-10.02-4.49-10.02-10.02V10.52C.5,4.99,4.99.5,10.52.5Z"
                  style={{
                    stroke: "#fff2d3",
                    strokeMiterlimit: 10,
                  }}
                />
                <g>
                  <path
                    className="border3"
                    d="m37.73,17.14c-.78-1.85-1.9-3.52-3.33-4.94-1.43-1.43-3.09-2.55-4.94-3.33-1.92-.81-3.95-1.22-6.05-1.22s-4.14.41-6.05,1.22c-1.85.78-3.52,1.9-4.94,3.33-1.43,1.43-2.55,3.09-3.33,4.94-.81,1.92-1.22,3.95-1.22,6.05s.41,4.14,1.22,6.05c.25.59.53,1.16.85,1.7l-2.21,8.07,8.26-2.17c.45.24.91.47,1.38.67,1.92.81,3.95,1.22,6.05,1.22s4.14-.41,6.05-1.22c1.85-.78,3.52-1.9,4.94-3.33,1.43-1.43,2.55-3.09,3.33-4.94.81-1.92,1.22-3.95,1.22-6.05s-.41-4.14-1.22-6.05Zm-14.33,18.96c-1.8,0-3.52-.37-5.08-1.04-.68-.29-1.33-.64-1.94-1.04l-3.25.85-1.66.44.45-1.63.86-3.16c-.41-.59-.77-1.22-1.08-1.88-.77-1.66-1.21-3.5-1.21-5.45,0-7.12,5.79-12.91,12.91-12.91s12.91,5.79,12.91,12.91-5.79,12.91-12.91,12.91Z"
                    style={{ strokeWidth: "0px" }}
                  />
                  <path
                    className="border3"
                    d="m31.01,26.7c-.74-.39-3.02-1.46-3.02-1.46-.65-.3-.83-.14-1.04.13l-1.21,1.52c-.16.21-.44.28-.68.17-.79-.36-2.18-.87-3.51-2.19-.87-.87-1.58-1.82-1.93-2.45-.25-.45-.12-.56.22-.9.14-.14.51-.58.65-.8.23-.38.46-.6.22-1.16l-1.28-3.08c-.12-.28-.33-.47-.64-.47-.29,0-.66-.01-.96,0-.2,0-.48.11-.65.22-.28.19-1.62,1.35-1.67,3.25-.02.83.17,1.73.55,2.57.81,1.78,2.74,3.9,3.87,5.01,2.27,2.24,5.29,3.27,6.78,3.55,1.3.24,2.84-.1,3.95-1.29.09-.09.17-.22.24-.32.19-.31.4-1.28.42-1.76,0-.23-.08-.42-.28-.53Z"
                    style={{ strokeWidth: "0px" }}
                  />
                </g>
              </g>
            </svg>
          </span>
        </WhatsappShareButton>
        <TwitterShareButton title={texto}>
          <span className="iconSocial2 w-20 h-20 inline-block">
            <svg
              className="Xicon"
              id="uuid-12eae5f9-2b86-498e-9dff-5aa1523c63ed"
              data-name="Capa 2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 46.66 46.66"
            >
              <g
                id="uuid-ab9fd629-181b-47b8-85d7-e05f5ce39b75"
                data-name="Capa 5"
              >
                <path
                  className="borde1"
                  d="m10.52.5h25.62c5.53,0,10.02,4.49,10.02,10.02v25.61c0,5.53-4.49,10.03-10.03,10.03H10.52c-5.53,0-10.02-4.49-10.02-10.02V10.52C.5,4.99,4.99.5,10.52.5Z"
                  style={{ strokeWidth: "0px" }}
                />
                <path
                  d="m10.52.5h25.62c5.53,0,10.02,4.49,10.02,10.02v25.61c0,5.53-4.49,10.03-10.03,10.03H10.52c-5.53,0-10.02-4.49-10.02-10.02V10.52C.5,4.99,4.99.5,10.52.5Z"
                  style={{
                    fill: "none",
                    stroke: "#fff2d3",
                    strokeMiterlimit: 10,
                  }}
                />
                <path
                  className="border3"
                  d="m26.11,21.38l10.88-11.66h-2.66l-9.4,10.08-7.52-10.08h-8.37l11.24,15.06-11.34,12.17h2.66l9.86-10.58,7.9,10.58h8.36l-11.62-15.56Zm-3.29,3.54l-1.18-1.59-8.71-11.67h3.51l7.15,9.58,1.18,1.58,9.09,12.17h-3.51l-7.52-10.08Z"
                  style={{ strokeWidth: "0px" }}
                />
              </g>
            </svg>
          </span>
        </TwitterShareButton>

        <span
          onClick={() => {
            copiarUrl();
            compartirConWebShareAPI();
          }}
          className="iconSocial cursor-pointer w-20 h-20 inline-block"
        >
          <svg
            id="uuid-e29d09ac-c041-4125-97f4-a2e4acc83cd3"
            data-name="Capa 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 47.66 47.66"
          >
            <g
              id="uuid-2d2aec0d-1869-4155-8fd5-6754c9c75eb1"
              data-name="Capa 7"
            >
              <path
                className="transition"
                d="m36.64,1H11.02C5.49,1,1,5.49,1,11.02v25.61c0,5.54,4.49,10.03,10.03,10.03h9.25v-15.9h-5.93v-6.65h5.93v-6.7c0-3.91,3.17-7.08,7.07-7.08h6.7v6.02h-3.72c-1.61,0-2.92,1.31-2.92,2.92v4.83h6.24l-1.03,6.65h-5.21v15.9h9.23c5.53,0,10.02-4.49,10.02-10.02V11.02c0-5.53-4.49-10.02-10.02-10.02Z"
                style={{
                  opacity: 0.91,
                  stroke: "#fff2d3",
                  strokeMiterlimit: 10,
                }}
              />
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
}

export default CompartirContenido;
