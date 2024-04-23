import gsap from "gsap";
import React from "react";

const Punto = ({
  texto,
  imagen,
  customStyle,
  incremento,
  index,
  Ocultarpuntos,
}) => {
  const handleClick = () => {
    gsap.to(".capa", {
      className: "activeCapa",
    });
    gsap.to(".punto", {
      opacity: 0.1,
    });

    if (index === 1) {
      gsap.to(".line-1 .line, .line-1 .caja", {
        opacity: 1,
      });
      gsap.to(".line-2 .line, .line-2 .caja", {
        opacity: 0,
      });
      gsap.to(".line-3 .line, .line-3 .caja", {
        opacity: 0,
      });
    }
    if (index === 2) {
      gsap.to(".line-1 .line, .line-1 .caja", {
        opacity: 0,
      });
      gsap.to(".line-2 .line, .line-2 .caja", {
        opacity: 1,
      });
      gsap.to(".line-3 .line, .line-3 .caja", {
        opacity: 0,
      });
    }
    if (index === 3) {
      gsap.to(".line-1 .line, .line-1 .caja", {
        opacity: 0,
      });
      gsap.to(".line-2 .line, .line-2 .caja", {
        opacity: 0,
      });
      gsap.to(".line-3 .line, .line-3 .caja", {
        opacity: 1,
      });
    }
  };
  return (
    <div
      className={`${
        customStyle ? customStyle : ""
      }  line-${index} z-10 Toltip absolute flexCenter`}
    >
      <span
        onClick={handleClick}
        className={`cursor-pointer punto relative xs:w-6 xs:h-6 lg:w-6 lg:h-6 inline-block bg-[--yellow] rounded-full`}
      ></span>
      <div
        onClick={Ocultarpuntos}
        className={`${
          incremento ? incremento : "1rem"
        } h-[0.1rem] line bg-white inline-block max-lg:hidden`}
      ></div>
      <div
        onClick={Ocultarpuntos}
        className={`caja max-lg:fixed max-lg:translate-x-[-50%] max-lg:translate-y-[-50%] max-lg:top-1/2 max-lg:left-1/2 xs:w-3/4 sm:w-1/2 lg:w-full font-inter text-center lg:max-w-96 w-fit min-h-48 p-6 flexCenter flex-col bg-[--blackTransparente] rounded-3xl border border-[--yellow] text-[--yellow]`}
      >
        <span className=" w-5/4">
          <img src={imagen} alt="" />
        </span>
        <p className="max-lg:text-2xl">{texto ? texto : "Ingresar texto"}</p>
      </div>
    </div>
  );
};

export default Punto;
