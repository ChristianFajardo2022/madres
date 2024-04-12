import React, { useEffect, useRef, useState } from "react";
import Video from "../componentes/Video";
import { Link } from "react-router-dom";
import gsap from "gsap";
import LoadVideo from "../componentes/LoadVideo";
import Button from "../componentes/Button";
import Texto from "../componentes/Texto";
import LoadingEnd from "../componentes/Loading";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [videoCargado, setVideocargado] = useState(false);
  const [inicioComercial, setinicioComercial] = useState(false);
  const [play, setPlay] = useState(false);
  const [onplay, setOnPlay] = useState(false);
  const [omitir, setOmitir] = useState(false);
  const videoLoad = useRef(null);
  const videoLoad2 = useRef(null);

  const end = () => {
    const vide = videoLoad.current;
    const vide2 = videoLoad2.current;

    vide.style.display = "none";
    vide2.style.display = "block";
    const tl = gsap.timeline();
    tl.to(
      vide2,

      {
        display: "block",
        opacity: 1,
        ease: "power1.inOut",
        duration: 0.5,
      }
    );
    tl.add(() => setinicioComercial(true));
  };
  console.log(loading);
  const onLoadVideo = () => {
    setVideocargado(true);
  };
  const avanzar = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      const tl = gsap.timeline();
      tl.to(".titleInicio", {
        opacity: 1,
        display: "block",
        ease: "power1.inOut",
        delay: 0.5,
      });
      tl.to(".inicioComercial", {
        opacity: 1,
        display: "block",
        ease: "power1.inOut",
        delay: 0.8,
      });
    }
  }, [loading]);

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
            "radial-gradient(circle, rgb(0 0 0 / 60%) 0%, rgb(0, 0, 0) 60%)",
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
          duration: 1,
          ease: "power1.inOut",
        }
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
          duration: 0.1,
          ease: "power1.out",
        }
      ),
        "<-=0.1";
    }
  }, [videoCargado, play]);

  return (
    <>
      <div
        className={`w-full h-full bg-plate-500 flex justify-center items-center bg-black`}
      >
        <LoadVideo
          customStyle={"hidden"}
          videoLoad={videoLoad}
          url={"/begin2.mp4"}
          onLoadedData={avanzar}
        />
        {loading ? (
          <>
            <LoadingEnd />
          </>
        ) : (
          <div className="w-full h-full ">
            <LoadVideo videoLoad={videoLoad} url={"/begin2.mp4"} loop={false} />

            <div className="gradientBlur z-20 backdrop-blur-[8px] pointer-events-none w-full opacity-0 h-full floatcenter bg-white bg-opacity-5"></div>
            <div className="gradientBlack z-10 pointer-events-none w-full h-full floatcenter opacity-0"></div>

            <div className="cajaTitulos absolute top-3/4 left-1/2 translate-x-[-50%] flex items-center justify-between h-44 flex-col">
              <h1 className="titleInicio hidden opacity-0 ajusteFuente">
                Donde todos los hijos <br />
                tienen algo por decir
              </h1>
              <Button
                custoMStyle={
                  "inicioComercial hidden opacity-0 text-3xl ajusteFuente"
                }
                handleClick={() => setPlay(true)}
                title={"CONOCE ESTA HISTORIA"}
              />
            </div>

            <div
              className={`videoVimeo max-w-[1300px] z-[9] 2xl:h-[930px] floatcenter w-full py-4 flex flex-col justify-center items-center`}
            >
              <Video
                setPlay={setOnPlay}
                play={onplay}
                VideoReady={onLoadVideo}
                url={"https://www.youtube.com/watch?v=JpjNBF1W4UA"}
              />
              <div className="cajaIcon m-6 relative w-full flex justify-between">
                {omitir && (
                  <>
                    <Button
                      handleClick={() => {
                        if (onplay) {
                          setOnPlay(false);
                        } else {
                          setOnPlay(true);
                        }
                      }}
                      custoMStyle={`fade z-10 btn text-xl  transition iconPlay ${
                        !onplay ? "active" : ""
                      }`}
                      title={
                        <>
                          <>
                            {onplay && (
                              <span className="inline-block  ">
                                <img src="/iconplay.gif" alt="" />
                              </span>
                            )}
                            <Texto
                              customstyle={`${onplay ? "ml-2" : "ml-[0.4rem]"}`}
                              title={<>{onplay ? "off" : "on"}</>}
                            />
                          </>
                        </>
                      }
                    />

                    <Link
                      to={"/grabar-audio"}
                      className={`floatcenter fade z-10 btn text-xl  transition`}
                    >
                      <Texto title={"ahora, es tu turno"} />
                    </Link>
                    <Link
                      to={"/grabar-audio"}
                      className={`fade z-10 btn opacity-30 hover:opacity-100 text-xl transition`}
                    >
                      <Texto title={"omitir"} />
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
