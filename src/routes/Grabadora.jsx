import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Texto from "../componentes/Texto";
import FormSteps from "../componentes/FormSteps";
import LoadVideo from "../componentes/LoadVideo";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { useRef } from "react";
import LoadingEnd from "../componentes/Loading";
import gsap from "gsap";
import {
  full,
  laptop,
  minilaptop,
  mobile,
  tablet,
} from "../helpers/medidasResponsive";
import Punto from "../componentes/Punto";
import Navbar from "../componentes/Navbar";
import Explora from "../componentes/Explora";
import CorazonPalpitante from "../componentes/CorazonPalpitante";
import CompartirContenido from "../componentes/CompartirContenido";
import Prospero from "../componentes/Prospero";
import Video from "../componentes/Video";
import Comercial from "../componentes/Comercial";
import { Helmet } from "react-helmet";
import { fetchStockData } from "../helpers/stockFunctions";
import RescatarDatos from "../componentes/RescatarDatos";

function Grabadora() {
  const [loading, setLoading] = useState(true);
  const [playVideo, setPlayVideo] = useState(false);
  const [botonAudio, setBotonAudio] = useState(false);
  const [reproducir, setReproducir] = useState(false);
  const [elemtCargado, setElemtCargado] = useState(false);
  const [stock, setStock] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    customer_id: "",
    promoid: "MMbear",
    trx_status: "",
    order_id: "",
    stockUpdated: false,
  });

  const videoLoad = useRef(null);

  useEffect(() => {
    fetchStockData(setStock);
  }, []);

  const { isRecording, startRecording, stopRecording, recordingBlob } =
    useAudioRecorder();

  // Ejecutar el loading
  useEffect(() => {
    if (elemtCargado) {
      avanzar();
    }
  }, [elemtCargado]);

  //FUncion para avanzar de tarjeta
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

  //Bombeo del corazon del oso
  useEffect(() => {
    if (botonAudio) {
      gsap.to(".corazonOso", {
        scale: 1.1,
        ease: "bounce.in",
        repeat: -1,
        yoyo: true,
        duration: 1,
      });
      gsap.to(".corazonOso .path1", {
        opacity: 1,
        ease: "bounce.in",
        repeat: -1,
        yoyo: true,
        duration: 1,
      });
      gsap.to(".corazonOso .path2", {
        opacity: 1,
        ease: "bounce.in",
        repeat: -1,
        yoyo: true,
        duration: 1,
        delay: 0.2,
      });
      gsap.to(".corazonOso .path3", {
        opacity: 1,
        ease: "bounce.in",
        repeat: -1,
        yoyo: true,
        duration: 1,
        delay: 0.3,
      });

      gsap.to(".Oprime", {
        opacity: 1,
        ease: "power1.inOut",
        duration: 1,
        delay: 0.4,
      });
    }
  }, [botonAudio]);

  //Play al video

  const handlePlayVideo = () => {
    if (playVideo) {
      setPlayVideo(false);
    } else {
      setPlayVideo(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Graba tu mensaje - operación mayo</title>
        <link rel="canonical" href="/grabar-audio" />
        <meta
          name="description"
          content="puedes grabar un mensaje de voz para enviárselo a mamá"
        />
      </Helmet>
      <header className="fixed lg:p-12 xs:p-6 w-full flex justify-between right-0 top-0 z-[200] hamburger text-white inter">
        <Prospero />
        <Navbar handlePlayVideo={handlePlayVideo} />
      </header>
      <RescatarDatos setFormData={setFormData} />

      <Comercial playVideo={playVideo} setPlayVideo={setPlayVideo} />
      <div id="graba" className="w-full h-full relative">
        <div className="w-full gradiente h-screen absolute z-[1]"></div>
        <div className="w-full h-full  ">
          {loading && <LoadingEnd elemtCargado={elemtCargado} />}
          {(mobile || tablet) && (
            <img
              onLoad={() => setElemtCargado(true)}
              className="osoVideo oso absolute left-0 z-[-1] "
              src={
                tablet
                  ? "/imagenes/oso-fondo-tablet.webp"
                  : "/imagenes/oso-fondo-mobile.webp"
              }
              alt="Oso peluche Homenaje dia de las madres Inter rapidísimo"
            />
          )}

          {(full || laptop || minilaptop) && (
            <LoadVideo
              onLoadedData={() => setElemtCargado(true)}
              customStyle={"osoVideo absolute left-0 z-[-1]"}
              videoLoad={videoLoad}
              url={"/videoBear.mp4"}
              loop={true}
            />
          )}

          <div className=" w-full h-full flex max-lg:flex-col relative justify-between items-center">
            <div className="cajaOso z-20 flex flex-col relative justify-between 2xl:pt-28 xl:pt-48 xs:pt-3 lg:pb-6 items-center lg:w-1/2 xs:w-full lg:h-full xs:h-1/2">
              {/*           <p className="py-4">{status}</p> */}
              <Texto
                customstyle={"textoStock w-full text-center"}
                title={
                  <>
                    <p className="w-1/2 m-auto lg:text-4xl xs:text-3xl">
                      <span className="text-[var(--yellow)]">
                        {stock && (
                          <>
                            {stock.stock >= 250 &&
                              `Osos disponibles: ${stock.stock}`}
                            {stock.stock == 0 && `Operacion mayo`}
                          </>
                        )}
                      </span>
                    </p>
                  </>
                }
              />
              <Texto
                customstyle={"textoStock w-full text-center"}
                title={
                  <>
                    <p className="lg:text-6xl xs:text-3xl">
                      <span className="text-[var(--yellow)]">
                        Precio $80.000
                      </span>
                    </p>
                    {/* <p className="lg:text-4xl xs:text-lg">
                      <span className="text-[var(--yellow)] w-full text-center line-through inline-block">
                        despues $80.000
                      </span>
                    </p> */}
                  </>
                }
              />
              <CorazonPalpitante
                handleClick={() => setReproducir(true)}
                botonAudio={botonAudio}
              />
            </div>
            <div className="cajaCards Onboarding">
              <FormSteps
                setBotonAudio={setBotonAudio}
                startRecording={startRecording}
                stopRecording={stopRecording}
                status={isRecording}
                mediaBlobUrl={recordingBlob}
                setReproducir={setReproducir}
                reproducir={reproducir}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>
        </div>
      </div>
      <div id="explora" className="w-full h-full bg-black relative">
        <Explora />
      </div>

      <div
        id="compartir"
        className="w-full h-full bg-black relative flexCenter text-[--yellow]"
      >
        <CompartirContenido
          texto={
            "En operacion mayo puedes grabar un mensaje de voz para enviárselo a mamá dentro de un osito peluche para celebrar el Día de las Madres. 🤩 🥰"
          }
          url={"operacionmayo.com"}
        />
      </div>
    </>
  );
}

export default Grabadora;
