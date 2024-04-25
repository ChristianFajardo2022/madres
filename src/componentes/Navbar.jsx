import React, { useEffect, useState } from "react";
import HamburgesaIcon from "./HamburgesaIcon";
import gsap from "gsap";
import { Link } from "react-router-dom";

const Navbar = () => {
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

      // Determinar la sección en función del porcentaje de desplazamiento
      if (scrollPercentage >= 66) {
        setseccioNumber(3);
      } else if (scrollPercentage >= 33) {
        setseccioNumber(2);
      } else {
        setseccioNumber(1);
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
        height: "24rem",
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

        height: "0rem",
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
      <div
        onClick={handleClick}
        className="cerrarMenu z-10 w-full h-full fixed top-0 left-0"
      ></div>
      <nav className="menuLink opacity-0 h-0 flex flex-col justify-center shadowCard absolute z-50 bg-[var(--whiteTransparente)] right-14 top-8 w-80 rounded-3xl list-none">
        <li className="navLink">
          <Link to={"/"}>Operación mayo</Link>
        </li>
        <li className="navLink">
          <a href="#graba">Grabar mensaje</a>
        </li>
        <li className="navLink">
          <a href="#explora">Explorar historias</a>
        </li>
        <li className="navLink">
          <a href="#compartir">Compartir</a>
        </li>
      </nav>
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
  );
};

export default Navbar;
