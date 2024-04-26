import { Link } from "react-router-dom";
import { full, mobile } from "./helpers/medidasResponsive";

export default function ErrorPage() {
  return (
    <div className="bg-black w-full h-full">
      <span className="absolute top-0 left-0 w-full h-full inline-block">
        <img
          src={`${mobile ? "/imagenes/errorM.webp" : "/imagenes/error.webp"} `}
          alt="Pagina no encontrada error 404"
        />
      </span>
      <h1 className="absolute opacity-0">Pagina no encontrada error 404</h1>
      <Link
        to={"/grabar-audio"}
        className="btn absolute top-3/4 left-1/2 translate-x-[-50%]"
      >
        Ir al home
      </Link>
    </div>
  );
}
