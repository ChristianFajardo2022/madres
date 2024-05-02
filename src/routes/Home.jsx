import React, { useEffect, useRef, useState } from "react";
import Video from "../componentes/Video";
import { Link } from "react-router-dom";
import gsap from "gsap";
import LoadVideo from "../componentes/LoadVideo";
import Button from "../componentes/Button";
import Texto from "../componentes/Texto";
import LoadingEnd from "../componentes/Loading";
import IconPlayVideo from "../componentes/IconPlayVideo";
import { mobile, tablet } from "../helpers/medidasResponsive";
import Prospero from "../componentes/Prospero";
import { Helmet } from "react-helmet";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [elemtCargado, setElemtCargado] = useState(false);
  const [soldado, setSoldado] = useState(false);
  const [neblina, setNeblina] = useState(false);
  const [videoCargado, setVideocargado] = useState(false);
  const [inicioComercial, setinicioComercial] = useState(false);
  const [play, setPlay] = useState(false);
  const [onplay, setOnPlay] = useState(false);
  const [end, setEnd] = useState(false);
  const [omitir, setOmitir] = useState(false);
  const imgLoad = useRef(null);
  const imgLoad2 = useRef(null);

  const onLoadVideo = () => {
    setVideocargado(true);
  };

  const avanzar = () => {
    const tl = gsap.timeline();
    tl.delay(2);
    tl.to(".loading", {
      opacity: "0",
      ease: "power1.inOut",
      duration: 1,
    });
    tl.add(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    if (neblina === true && soldado === true) {
      setElemtCargado(true);
    }
    if (elemtCargado) {
      avanzar();
    }
  }, [elemtCargado, neblina, soldado]);

  useEffect(() => {
    if (!loading) {
      const tl = gsap.timeline();

      tl.to(".logoOperacion", {
        opacity: 1,
        display: "block",
        ease: "power1.Out",
        delay: 0.5,
      });
      tl.to(
        ".bg-Img",
        {
          scale: 1.05,

          duration: 20,
          ease: "power1.out",
        },
        "<-=0.5"
      );
      tl.to(
        ".logoOperacion",
        {
          scale: 1.05,

          duration: 20,
          ease: "power1.out",
        },
        "<-=0.5"
      );
      tl.to(
        ".cajaTitulos",
        {
          opacity: 1,
          pointerEvents: "all",
          display: "flex",
          ease: "power1.inOut",
          delay: 0.5,
        },
        "<+=2"
      );
    }
  }, [loading]);
  useEffect(() => {
    if (onplay) {
      gsap.to(".omitir.btn", {
        visibility: "visible",
        duration: 0.5,
        ease: "power1.in",
        delay: 5,
      });
    }
  }, [onplay]);
  useEffect(() => {
    if (play) {
      setOmitir(true);
      setOnPlay(true);
      const tl = gsap.timeline();
      tl.fromTo(
        ".gradientBlack",
        {
          opacity: 0,
          backgroundImage:
            "radial-gradient(circle, rgb(0 0 0 / 0%) 0%, rgb(0 0 0 / 0%) 100%)",
        },
        {
          opacity: 1,
          backgroundImage:
            "radial-gradient(circle, rgb(0 0 0 / 70%) 0%, rgb(0, 0, 0 / 80%) 100%)",
          duration: 0.8,
          ease: "power1.in",
        }
      );
      tl.fromTo(
        ".gradientBlur",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
          ease: "power1.in",
        },
        "<-=0.5"
      );
      tl.fromTo(
        ".cajaTitulos",
        {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: 1,
          ease: "power1.in",
        },
        "<"
      );
      tl.fromTo(
        ".logoOperacion",
        {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: 1,
          ease: "power1.in",
        },
        "<"
      );
      tl.fromTo(
        ".neblina",
        {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: 1,
          ease: "power1.in",
        },
        "<"
      );

      tl.fromTo(
        ".gradientBlack",
        {
          zIndex: 10,
        },
        {
          zIndex: 1,
          duration: 0.1,
          ease: "power1.out",
        }
      );
      tl.fromTo(
        ".gradientBlur",
        {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: 0.2,
          ease: "power1.out",
        }
      );
      tl.fromTo(
        ".videoVimeo",
        {
          opacity: 0,
          pointerEvents: "none",
          visibility: "hidden",
        },
        {
          opacity: 1,
          pointerEvents: "all",
          visibility: "visible",
          duration: 2,
          ease: "power1.inOut",
        }
      );
    }
  }, [videoCargado, play]);

  return (
    <>
      <Helmet>
        <title>Operación mayo</title>
        <link rel="canonical" href="/" />
        <meta name="description" content="Homenaje para todas las madres" />
      </Helmet>
      <div
        className={`w-full h-full bg-plate-500 flex justify-center items-center bg-black overflow-hidden`}
      >
        <img
          ref={imgLoad}
          onLoad={() => setSoldado(true)}
          src="/imagenes/operacion-mayo.webp"
          className="hidden"
          alt="Operación mayo, homenaje dia de las madres"
        />
        <LoadVideo
          onLoadedData={() => setNeblina(true)}
          customStyle={"hidden"}
          url={"/neblina.mp4"}
        />
        {loading ? (
          <>
            <LoadingEnd elemtCargado={elemtCargado} soldado={true} />
          </>
        ) : (
          <div className="w-full h-full ">
            <Prospero
              customStyle={
                "absolute z-10 prospero left-1/2 translate-x-[-50%] 2xl:top-12 top-20"
              }
            />
            <img
              ref={imgLoad}
              src={`${
                mobile
                  ? "/imagenes/operacion-mayoM.webp"
                  : tablet
                  ? "/imagenes/operacion-mayoT.webp"
                  : "/imagenes/operacion-mayo.webp"
              }`}
              className="bg-Img block"
              alt="Operación mayo, homenaje dia de las madres"
            />

            <h1 className="fixed h-full w-full z-10 left-0 top-0 pointer-events-none">
              <span className="absolute opacity-0 invisible left-0 top-0">
                Operación mayo, homenaje dia de las madres
              </span>
              <img
                src={`${
                  mobile
                    ? "/imagenes/logoHomeM.webp"
                    : tablet
                    ? "/imagenes/logoHomeT.webp"
                    : "/imagenes/logoHome.webp"
                }`}
                className="logoOperacion absolute top-0 opacity-0 "
                alt="Logo Operación mayo, homenaje dia de las madres"
              />
            </h1>

            <LoadVideo
              customStyle={"neblina bgvid"}
              loop={true}
              url={"/neblina.mp4"}
            />

            <div className="gradientBlur z-20 backdrop-blur-[8px] pointer-events-none w-full opacity-0 h-full floatcenter bg-white bg-opacity-5"></div>
            <div className="gradientBlack z-10 pointer-events-none w-full h-full floatcenter opacity-0"></div>

            <button
              onClick={() => setPlay(true)}
              className="cajaTitulos group opacity-0 pointer-events-none cursor-pointer btn fixed top-2/3 left-1/2 translate-x-[-50%] flex items-center justify-center"
            >
              <span className="Bebas transition group-hover:text-black text-[--yellow]  titleInicio text-3xl sm:mr-4 xs:mr-1">
                Reproducir
              </span>
              <span className="inicioComercial inline-block w-full max-w-10 max-h-10 h-full">
                <svg
                  id="uuid-78de462e-10d0-4126-aff2-63d9e8f378a3"
                  data-name="Capa 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 166.72 166.72"
                >
                  <path
                    className="transition fill-[--yellow] group-hover:fill-black"
                    id="uuid-f118bb66-bbaa-4012-a086-d1c7f9460bbc"
                    data-name="Icon"
                    d="m142.31,24.42C126.56,8.67,105.63,0,83.36,0S40.16,8.67,24.42,24.42C8.67,40.16,0,61.09,0,83.36s8.67,43.2,24.42,58.95c15.74,15.74,36.68,24.42,58.95,24.42s43.2-8.67,58.95-24.42c15.74-15.74,24.42-36.68,24.42-58.95s-8.67-43.2-24.42-58.95Zm-58.95,137.76c-43.46,0-78.82-35.36-78.82-78.82S39.9,4.54,83.36,4.54s78.82,35.36,78.82,78.82-35.36,78.82-78.82,78.82Zm36.86-88.79l-49.64-24.82c-3.09-1.55-6.7-1.39-9.64.43-2.94,1.82-4.7,4.97-4.7,8.43v49.64c0,3.46,1.76,6.61,4.7,8.43,1.6.99,3.4,1.49,5.2,1.49,1.51,0,3.03-.35,4.44-1.06l49.64-24.82c3.38-1.69,5.48-5.08,5.48-8.86s-2.1-7.17-5.48-8.86Zm-2.3,13.13l-49.64,24.82c-1.51.76-3.2.68-4.64-.21-1.44-.89-2.26-2.37-2.26-4.06v-49.64c0-1.69.82-3.17,2.26-4.06.78-.48,1.64-.73,2.5-.73.72,0,1.45.17,2.14.52l49.64,24.82h0c1.65.83,2.64,2.42,2.64,4.27s-.99,3.44-2.64,4.27Zm-51.23,28.27l16.67-8.34,16.67-8.34,16.67-8.34s7.71-1.48,3.85-13.24l-53.87-28.44c-2.73,1.51-6.32,4.08-8.34,8.34-2.95,6.21-.97,12.65,0,16.67,1.75,7.28,2.96,18.17,0,33.34l8.34,8.34Z"
                    style={{ strokeWidth: "0px" }}
                  />
                </svg>
              </span>
            </button>

            <div
              className={`videoVimeo z-[9] lg:w-[70%] xs:w-full floatcenter  py-4 flex flex-col justify-center items-center`}
            >
              <Video
                setEnd={() => {
                  setPlay(false);
                  setEnd(true);
                }}
                setPlay={setOnPlay}
                play={onplay}
                VideoReady={onLoadVideo}
                url={"https://www.youtube.com/watch?v=YBGU3g6Tbrk"}
              />
              <div className="cajaIcon m-6 p-4 relative w-full flex justify-end">
                {omitir && (
                  <>
                    {/* <IconPlayVideo onplay={onplay} setOnPlay={setOnPlay} /> */}

                    <Link
                      to={"/grabar-audio"}
                      className={`omitir invisible fade z-10 btn ${
                        end ? "active" : "opacity-30"
                      } hover:opacity-100 text-xl transition`}
                    >
                      <Texto title={end ? "ahora, es tu turno" : "omitir"} />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
