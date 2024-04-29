import gsap from "gsap";
import React, { useEffect } from "react";
import LoaderSoldier from "./LoaderSoldier";

const IconoLoaderSoldado = ({ texto }) => {
  useEffect(() => {
    gsap.to(".hearticonLoading", {
      scale: 1.3,
      transformOrigin: "center center", // Establecer el origen de la transformación en el centro
      repeat: -1,
      duration: 0.3,
      yoyo: true,
      ease: "bounce.in",
    });

    gsap.to(".soldadoLoader", {
      opacity: 1,
      ease: "power1.inOut",
      duration: 1,
    });
  }, []);
  return (
    <>
      <span className=" inline-block w-full h-full">
        <p className="absolute helvetica font-bold z-10 left-1/2 translate-x-[-50%] lg:top-[43%] xs:top-[45%] sm:top-[46%] lg:text-7xl xs:text-5xl text-[--yellow]">
          {texto}%
        </p>
        <img
          className="soldadoLoader opacity-0"
          src="/svg/soldado.svg"
          alt=""
        />
        {/* <LoaderSoldier /> */}
      </span>
    </>
  );
};

export default IconoLoaderSoldado;
