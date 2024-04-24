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

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [elemtCargado, setElemtCargado] = useState(false);
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
    tl.delay(1);
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
    if (elemtCargado) {
      avanzar();
    }
  }, [elemtCargado]);

  useEffect(() => {
    if (!loading) {
      const tl = gsap.timeline();
      tl.to(".bg-Img", {
        scale: 1.2,
        yoyo: true,
        repeat: -1,
        duration: 20,
        ease: "power1.out",
      });
      tl.to(
        ".titleInicio",
        {
          opacity: 1,
          display: "block",
          ease: "power1.inOut",
          delay: 0.5,
        },
        "<"
      );
      tl.to(
        ".inicioComercial",
        {
          opacity: 1,
          display: "flex",
          ease: "power1.inOut",
          delay: 0.8,
        },
        "<"
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
      <div
        className={`w-full h-full bg-plate-500 flex justify-center items-center bg-black overflow-hidden`}
      >
        <img
          ref={imgLoad}
          onLoad={() => setElemtCargado(true)}
          src="/imagenes/operacion-mayo.webp"
          className="hidden"
          alt=""
        />
        {loading ? (
          <>
            <LoadingEnd elemtCargado={elemtCargado} />
          </>
        ) : (
          <div className="w-full h-full ">
            <img
              ref={imgLoad}
              src="/imagenes/operacion-mayo.webp"
              className="bg-Img block"
              alt=""
            />

            <div className="gradientBlur z-20 backdrop-blur-[8px] pointer-events-none w-full opacity-0 h-full floatcenter bg-white bg-opacity-5"></div>
            <div className="gradientBlack z-10 pointer-events-none w-full h-full floatcenter opacity-0"></div>

            <div className="cajaTitulos w-full absolute floatcenter flex items-center justify-center h-44">
              {/* <h1 className="titleInicio hidden opacity-0 ajusteFuente w-full">
                Donde todos los hijos <br />
                tienen algo por decir
              </h1> */}

              <span
                onClick={() => setPlay(true)}
                className=" cursor-pointer inicioComercial hidden opacity-0 w-20 mr-8 h-auto"
              >
                <img src="/IconoPlay.svg" alt="" />
              </span>
              <span className="text-white titleInicio text-6xl">
                Reproducir
              </span>
            </div>

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
                url={"https://www.youtube.com/watch?v=JpjNBF1W4UA"}
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
