import React, { useEffect, useState } from "react";
import HamburgesaIcon from "./HamburgesaIcon";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { full, laptop, minilaptop } from "../helpers/medidasResponsive";

const Navbar = ({ gracias, handlePlayVideo }) => {
  const [active, setActive] = useState(false);
  const [seccion, setSeccion] = useState("explora");
  const [seccioNumber, setseccioNumber] = useState(1);

  const handleClick = () => {
    setActive((prevActive) => !prevActive);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Calcular el porcentaje de desplazamiento
      const scrollPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (gracias) {
        if (scrollPercentage >= 50) {
          setseccioNumber(2);
        } else {
          setseccioNumber(1);
        }
      } else {
        if (scrollPercentage >= 66) {
          setseccioNumber(3);
        } else if (scrollPercentage >= 33) {
          setseccioNumber(2);
        } else {
          setseccioNumber(1);
        }
      }
    };

    // Agregar el evento de desplazamiento cuando se monta el componente
    window.addEventListener("scroll", handleScroll);

    // Eliminar el evento de desplazamiento al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (active) {
      gsap.to(".menuLink", {
        opacity: 1,
        display: "flex",
        paddingTop: "3rem",
        ease: "power1.inOut",
        duration: 0.5,
      });
      gsap.to(".cerrarMenu", {
        display: "block",
      });
    } else {
      gsap.to(".menuLink", {
        opacity: 0,
        display: "none",
        paddingTop: "0rem",
        ease: "power1.inOut",
        duration: 0.5,
      });
      gsap.to(".cerrarMenu", {
        display: "none",
      });
    }
  }, [active]);

  return (
    <>
      <HamburgesaIcon handleClick={handleClick} active={active} />

      <nav className="menuLink uppercase h-full flex flex-col items-center justify-center shadowCard fixed z-50 bg-black bg-opacity-70 backdrop-blur-lg right-0 top-0 w-full   list-none">
        <li onClick={handleClick} className="navLink">
          <a href="#" onClick={handlePlayVideo}>
            Operación mayo
          </a>
        </li>
        <li onClick={handleClick} className="navLink">
          <a href="#graba">Grabar mensaje</a>
        </li>
        <li onClick={handleClick} className="navLink">
          <a href="#explora">Explorar historias</a>
        </li>
        <li onClick={handleClick} className="navLink">
          <a href="#compartir">Compartir</a>
        </li>
      </nav>
      {(full || laptop || minilaptop) && (
        <>
          {gracias ? (
            <>
              {seccioNumber == 2 && (
                <a
                  href={`#graba`}
                  onClick={() => setseccioNumber(1)}
                  className="fixed top-2 left-1/2 w-10 translate-x-[-50%]"
                >
                  <img src="/svg/arrow.svg" alt="" />
                </a>
              )}

              {seccioNumber == 1 && (
                <a
                  href={`#explora`}
                  onClick={() => setseccioNumber(2)}
                  className="fixed bottom-2 rotate-180 w-10 left-1/2 translate-x-[-50%]"
                >
                  <img src="/svg/arrow.svg" alt="" />
                </a>
              )}
            </>
          ) : (
            <>
              {seccioNumber == 2 && (
                <a
                  href={`#graba`}
                  onClick={() => setseccioNumber(1)}
                  className="fixed top-2 left-1/2 w-10 translate-x-[-50%]"
                >
                  <img src="/svg/arrow.svg" alt="" />
                </a>
              )}
              {seccioNumber == 3 && (
                <a
                  href={`#explora`}
                  onClick={() => setseccioNumber(2)}
                  className="fixed top-2 left-1/2 w-10 translate-x-[-50%]"
                >
                  <img src="/svg/arrow.svg" alt="" />
                </a>
              )}
              {seccioNumber == 1 && (
                <a
                  href={`#explora`}
                  onClick={() => setseccioNumber(2)}
                  className="fixed bottom-2 rotate-180 w-10 left-1/2 translate-x-[-50%]"
                >
                  <img src="/svg/arrow.svg" alt="" />
                </a>
              )}
              {seccioNumber == 2 && (
                <a
                  href={`#compartir`}
                  onClick={() => setseccioNumber(3)}
                  className="fixed bottom-2 rotate-180 w-10 left-1/2 translate-x-[-50%]"
                >
                  <img src="/svg/arrow.svg" alt="" />
                </a>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Navbar;
