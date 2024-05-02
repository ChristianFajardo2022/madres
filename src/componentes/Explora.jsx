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

const Explora = () => {
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
      imagen: "/imagenesVideo/making-off-operacion-mayo.webp",
    },
    {
      id: 1,
      title: "CABO RAMIREZ",
      url: "https://www.youtube.com/watch?v=A40AGZ9tPcw",
      imagen: "/imagenesVideo/cabo-ramirez.webp",
    },
    {
      id: 2,
      title: "SARGENTO",
      url: "https://www.youtube.com/watch?v=yHotu9zWfyM&t=363s",
      imagen: "/imagenesVideo/sargento-operacion-mayo.webp",
    },
  ];

  // Función para manejar el clic, asigna el índice del elemento activo
  const handleClickIndex = (index) => {
    setActiveIndex(index);
  };

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
      <div
        className={`videocasos 
        w-full h-full absolute top-0 left-0 z-[100] lg:p-16 xs:px-4 max-lg:py-24 flex flex-col justify-center items-start`}
      >
        <h2
          className="titleMenu text-[--yellow] lg:text-7xl xs:text-4xl max-lg:text-center max-lg:w-full"
          dangerouslySetInnerHTML={{ __html: activeVideo.title }}
        />

        <div className="videosCards my-6 w-full h-3/3 flex  cursor-pointer items-center justify-between max-lg:flex-grow max-lg:flex-col">
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
                    alt="Comercial de Homenaje dia de las madres Inter rapidísimo"
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

              <div className="flex justify-around items-center  h-1/3 w-full">
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
                    <img
                      src={item.imagen}
                      alt="Comercial de Homenaje dia de las madres Inter rapidísimo"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Explora;
