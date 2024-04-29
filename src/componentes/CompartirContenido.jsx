import React from "react";
import {
  TwitterShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from "react-share";
import LoadVideo from "./LoadVideo";

function CompartirContenido({ texto, url }) {
  const compartirConWebShareAPI = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Compartir",
          text: texto,
          url: url,
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
    alert(
      "La URL se ha copiado al portapapeles. ¡Puedes pegarla donde quieras!"
    );
  };

  return (
    <div className="flex flex-col lg:w-2/4 sm:w-1/2 xs:w-full h-full text-6xl flexCenter">
      <div className="w-full rotate-180 gradiente h-screen absolute z-[2]"></div>
      <LoadVideo
        customStyle={"absolute bottom-0 left-0 z-[1]"}
        url={"/videos/backComparte.mp4"}
        loop={true}
      />
      {navigator.share ? (
        <>
          <button
            className="Bebas ajusteFuente w-96 z-10"
            onClick={compartirConWebShareAPI}
          >
            Compartir
          </button>
          <div className="flex w-96 items-center justify-between mb-16 z-10">
            <div className="line"></div>
            <div className=" w-4/12 p-12">
              <img src="/svg/estrella.svg" alt="" />
            </div>
            <div className="line"></div>
          </div>
        </>
      ) : (
        <>
          <button className="Bebas ajusteFuente w-96 z-10">Compartir</button>
          <div className="flex w-96 items-center justify-between mb-16 z-10">
            <div className="line"></div>
            <div className=" w-4/12 p-12">
              <img src="/svg/estrella.svg" alt="" />
            </div>
            <div className="line"></div>
          </div>
        </>
      )}

      <div className="flex justify-evenly items-center w-4/6 z-10 max-lg:flex-wrap">
        <button
          className="btn hoverBtn max-lg:w-full max-lg:mb-16"
          onClick={copiarUrl}
        >
          Copiar Link
        </button>
        <WhatsappShareButton title={texto} url={url}>
          <span className="w-20 h-20 inline-block">
            <img src="/svg/whatapp.svg" alt="" />
          </span>
        </WhatsappShareButton>
        <TwitterShareButton title={texto} url={url}>
          <span className="w-20 h-20 inline-block">
            <img src="/svg/x.svg" alt="" />
          </span>
        </TwitterShareButton>
        <FacebookShareButton quote={texto} url={url}>
          <span className="w-20 h-20 inline-block">
            <img src="/svg/facebook.svg" alt="" />
          </span>
        </FacebookShareButton>
      </div>
    </div>
  );
}

export default CompartirContenido;
