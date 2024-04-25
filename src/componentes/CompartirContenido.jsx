import React from "react";
import {
  TwitterShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from "react-share";

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
    <div className="flex flex-col w-2/4 text-6xl">
      {navigator.share && (
        <button className="my-12" onClick={compartirConWebShareAPI}>
          Compartir
        </button>
      )}

      <div className="flex justify-evenly w-full">
        <button onClick={copiarUrl}>Copiar</button>
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
