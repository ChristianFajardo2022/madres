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

function Grabadora() {
  const [loading, setLoading] = useState(true);
  const [botonAudio, setBotonAudio] = useState(false);
  const [reproducir, setReproducir] = useState(false);
  const [elemtCargado, setElemtCargado] = useState(false);

  const videoLoad = useRef(null);
  const { isRecording, startRecording, stopRecording, recordingBlob } =
    useAudioRecorder();
  /* const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      mimeType: "audio/wav",
    }); */
  const navigate = useNavigate();

  const handleAudioSave = () => {
    navigate("/formulario", { state: { mediaRecorder } });
  };

  const Ocultarpuntos = () => {
    gsap.to(".line-1 .line, .line-1 .caja", {
      opacity: 0,
    });
    gsap.to(".line-2 .line, .line-2 .caja", {
      opacity: 0,
    });
    gsap.to(".line-3 .line, .line-3 .caja", {
      opacity: 0,
    });
    gsap.to(".activeCapa", {
      className: "capa",
    });
    gsap.to(".punto", {
      opacity: 1,
    });
  };

  //Compartir nativo de navegador

  const share = (object) => {
    if (navigator.share) {
    }
  };

  // Ejecutar el loading
  useEffect(() => {
    if (elemtCargado) {
      avanzar();
    }
  }, [elemtCargado]);
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
    }
  }, [botonAudio]);

  return (
    <>
      <div className="fixed right-0 top-0 z-[200] hamburger text-white inter">
        <Navbar />
      </div>
      <div id="graba" className="w-full h-full relative">
        <div className="w-full h-full  ">
          {loading && <LoadingEnd elemtCargado={elemtCargado} />}
          {(mobile || tablet) && (
            <img
              onLoad={() => setElemtCargado(true)}
              className="osoVideo oso absolute left-0 z-[-1]"
              src={tablet ? "/oso-fondo-tablet.jpg" : "/oso-fondo-mobile.jpg"}
              alt=""
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

          <div className="lg:p-14 xs:p-0 w-full h-full flex max-lg:flex-col relative justify-between items-center">
            <div className="cajaOso z-20 flex flex-col relative justify-center items-center lg:w-1/2 xs:w-1/2 lg:h-full xs:h-[45%]">
              {/*           <p className="py-4">{status}</p> */}
              <Texto
                customstyle={"absolute top-6"}
                title={
                  <>
                    <p className="lg:text-4xl xs:text-lg">
                      <span className="text-[var(--yellow)]">
                        osos disponibles: 827
                      </span>
                    </p>
                  </>
                }
              />
              <Texto
                customstyle={"absolute bottom-0"}
                title={
                  <>
                    <p className="lg:text-6xl xs:text-4xl">
                      <span className="text-[var(--yellow)]">AHORA: $0</span>
                    </p>
                    <p className="lg:text-4xl xs:text-lg">
                      <span className="text-[var(--yellow)] w-full text-center line-through inline-block">
                        $80.000
                      </span>
                    </p>
                  </>
                }
              />
              <CorazonPalpitante
                handleClick={() => setReproducir(true)}
                botonAudio={botonAudio}
              />
              {/*  {botonAudio ? (
              <>
                <div className="z-10 lg:relative w-full h-full">
                  <div onClick={Ocultarpuntos} className="capa "></div>
                  <Punto
                    Ocultarpuntos={Ocultarpuntos}
                    index={1}
                    customStyle={
                      "z-1 lg:left-[59%] sm:left-[59%] xs:left-[75%] lg:top-[20%]  xs:top-[31%]"
                    }
                    incremento={"w-12"}
                    imagen={"/imagenes/ojo.png"}
                    texto={
                      "El botón, su ojo improvisado era el vínculo que unía al soldado con su hogar."
                    }
                  />
                  <Punto
                    Ocultarpuntos={Ocultarpuntos}
                    index={2}
                    customStyle={
                      "z-2 lg:left-[6%]  xs:left-[36%] xs:left-[30%] lg:top-[38%] xs:top-[55%] flex-row-reverse"
                    }
                    incremento={"w-[3rem]"}
                    rotate={"translate-x-[-100%]"}
                    imagen={"/imagenes/heart.png"}
                    texto={
                      "Esta cicatriz es el testimonio del amor que EL soldado RAMÍREZ guardó dentro."
                    }
                  />
                  <Punto
                    Ocultarpuntos={Ocultarpuntos}
                    index={3}
                    customStyle={
                      "z-3 lg:left-[18%]  sm:left-[18%] xs:left-[-10%] xs:top-[78%] lg:top-[65%]"
                    }
                    incremento={"w-52"}
                    imagen={"/imagenes/path.png"}
                    texto={
                      "perdió parte de su relleno para cumplir la misión más noble que podía tener. DECIRLE FELIZ DÍA A MAMÁ"
                    }
                  />
                </div>
              </>
            ) : null} */}
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
          texto={"este sera algo inolvidable"}
          url={"operacionmayo.com"}
        />
      </div>
    </>
  );
}

export default Grabadora;
