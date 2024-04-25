import React, { useEffect, useRef, useState } from "react";
import HamburgesaIcon from "./HamburgesaIcon";
import gsap from "gsap";
import {
  full,
  laptop,
  minilaptop,
  mobile,
  tablet,
} from "../helpers/medidasResponsive";
import Video from "./Video";
import IconPlayVideo from "./IconPlayVideo";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [onplay, setOnPlay] = useState(false);

  const [ancho, setAncho] = useState(0);
  const card = useRef(null);
  const card2 = useRef(null);

  const youtube = [
    {
      id: 0,
      title: "MAKING OFF",
      url: "https://www.youtube.com/watch?v=JpjNBF1W4UA",
      imagen: "/imagenesVideo/img-1.jpg",
    },
    {
      id: 1,
      title: "SOLDADO RAMIREZ",
      url: "https://www.youtube.com/watch?v=A40AGZ9tPcw",
      imagen: "/imagenesVideo/img-2.jpg",
    },
    {
      id: 2,
      title: "PESCADOR",
      url: "https://www.youtube.com/watch?v=yHotu9zWfyM&t=363s",
      imagen: "/imagenesVideo/img-3.jpg",
    },
    {
      id: 3,
      title: "NIÑA",
      url: "https://www.youtube.com/watch?v=demhQVbn-YA",
      imagen: "/imagenesVideo/img-4.jpg",
    },
  ];

  // Función para manejar el clic, asigna el índice del elemento activo
  const handleClickIndex = (index) => {
    setActiveIndex(index);
  };

  const handleClick = () => {
    if (active) {
      setActive(false);
      //setOnPlay(false);
      setTimeout(() => {
        setActiveIndex(0);
      }, 200);
    } else {
      setActive(true);
      setOnPlay(true);
    }
  };
  useEffect(() => {
    if (active == false) {
      const tl = gsap.timeline();

      tl.to(".iconPlay", {
        opacity: 0,
        visibility: "hidden",
        duration: 0.2,
        ease: "power1.inOut",
      });
      tl.to(".titleMenu", {
        opacity: 0,
        duration: 0.2,
        ease: "power1.inOut",
      });
      tl.to(".videosCards", {
        opacity: 0,
        duration: 0.2,
        ease: "power1.inOut",
      });

      tl.to(".videocasos", {
        y: "-100%",
        ease: "power1.inOut",
        duration: 0.2,
      });
    } else if (active == true) {
      const tl = gsap.timeline();

      tl.to(".videocasos", {
        y: "0%",
        ease: "power1.inOut",
        duration: 0.2,
      });

      tl.to(".videosCards", {
        opacity: 1,
        visibility: "visible",
        duration: 0.2,
        delay: 0.2,
        ease: "power1.inOut",
      });

      tl.to(
        ".titleMenu",
        {
          opacity: 1,
          visibility: "visible",
          duration: 0.2,
          delay: 0.2,
          ease: "power1.inOut",
        },
        "<"
      );
      tl.to(
        ".iconPlay",
        {
          opacity: 1,
          visibility: "visible",
          duration: 0.2,
          delay: 0.2,
          ease: "power1.inOut",
        },
        "<"
      );
    }
  }, [active]);

  useEffect(() => {
    if (card.current) {
      const contenedorWidth = card.current.offsetWidth;
      setAncho(contenedorWidth);
    }
  }, [card]);

  // Encuentra el video correspondiente al activeIndex
  const activeVideo = youtube.find((video) => video.id === activeIndex);

  return (
    <>
      <HamburgesaIcon handleClick={handleClick} active={active} />
      <div
        className={`videocasos w-screen h-screen bg-[#00000090] backdrop-blur-[8px] fixed top-0 left-0 z-[100] lg:p-16 xs:px-4 max-lg:py-24 flex flex-col justify-center items-start`}
      >
        <h2
          className="titleMenu text-[--yellow] lg:text-7xl xs:text-4xl max-lg:text-center max-lg:w-full"
          dangerouslySetInnerHTML={{ __html: activeVideo.title }}
        />

        <div className="videosCards my-6 w-full h-3/3 flex  items-center justify-between max-lg:flex-grow max-lg:flex-col">
          {(full || laptop || minilaptop) && (
            <>
              {youtube.map((item) => (
                <div
                  key={item.id}
                  ref={activeIndex === item.id ? card : card2}
                  className={`itemnav  ${
                    activeIndex === item.id ? "active" : ""
                  }`}
                  onClick={() => handleClickIndex(item.id)}
                >
                  <img
                    className="absolute top-0 left-0 z-0"
                    src={item.imagen}
                    alt=""
                  />
                  <h2 className="z-[5] absolute bottom-4 text-5xl left-1/2 translate-x-[-50%]">
                    {item.title}
                  </h2>
                  <div
                    className={`z-10 relative w-full h-full ${
                      activeIndex === item.id
                        ? "opacity-100 visible"
                        : " opacity-0 invisible"
                    }`}
                  >
                    <Video
                      setEnd={() => setOnPlay(false)}
                      setPlay={activeIndex === item.id ? setOnPlay : null}
                      //play={activeIndex === item.id ? onplay : null}
                      contenedorWidth={ancho}
                      url={item.url}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
          {(mobile || tablet) && (
            <>
              <div
                className={`video overflow-hidden rounded-3xl border border-white bg-black flexCenter w-full h-1/2`}
                onClick={() => handleClickIndex(0)}
              >
                <Video
                  setEnd={() => setOnPlay(false)}
                  setPlay={setOnPlay}
                  play={onplay}
                  url={activeVideo.url}
                />
              </div>
              <div className="iconoPlayMob w-full flexCenter py-6">
                {(mobile || tablet) && (
                  <IconPlayVideo onplay={onplay} setOnPlay={setOnPlay} />
                )}
              </div>
              <div className="flex justify-between items-center  h-1/3 w-full">
                {youtube.map((item) => (
                  <div
                    key={item.id}
                    className={`itemnav  ${
                      activeIndex === item.id ? "hide" : ""
                    }`}
                    onClick={() => handleClickIndex(item.id)}
                  >
                    <h2 className="z-[5] absolute bottom-4 text-2xl left-1/2 translate-x-[-50%]">
                      {item.title}
                    </h2>
                    <img src={item.imagen} alt="" />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        {(full || laptop) && (
          <IconPlayVideo onplay={onplay} setOnPlay={setOnPlay} />
        )}
      </div>
    </>
  );
};

export default Navbar;
