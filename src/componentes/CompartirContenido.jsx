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
    <div>
      {navigator.share && (
        <button onClick={compartirConWebShareAPI}>Compartir</button>
      )}

      <>
        <button onClick={copiarUrl}>Copiar enlace</button>
        <TwitterShareButton title={texto} url={url}>
          <span>
            <img src="svg/x.svg" alt="" />
          </span>
        </TwitterShareButton>
        <FacebookShareButton quote={texto} url={url}>
          <span>
            <img src="svg/facebook.svg" alt="" />
          </span>
        </FacebookShareButton>
        <WhatsappShareButton title={texto} url={url}>
          <span>
            <img src="svg/whatsapp.svg" alt="" />
          </span>
        </WhatsappShareButton>
      </>
    </div>
  );
}

export default CompartirContenido;
