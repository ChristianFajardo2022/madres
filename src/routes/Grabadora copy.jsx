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

function Grabadora() {
  const [loading, setLoading] = useState(true);

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
    avanzar();
  }, []);

  return (
    <div className="w-full h-full relative">
      <div className="z-50 hamburger text-white inter">
        <Navbar />
      </div>
      <div className="w-full h-full  ">
        {loading && <LoadingEnd />}
        {(mobile || tablet) && (
          <img
            className="osoVideo oso absolute left-0 z-[-1]"
            src={
              tablet
                ? "/imagenes/oso-fondo-tablet.jpg"
                : "/imagenes/oso-fondo-mobile.jpg"
            }
            alt=""
          />
        )}

        {(full || laptop || minilaptop) && (
          <LoadVideo
            customStyle={"osoVideo absolute left-0 z-[-1]"}
            videoLoad={videoLoad}
            url={"/videoBear.mp4"}
            loop={true}
          />
        )}

        <div className="lg:p-8 xs:p-0 w-full h-full flex max-lg:flex-col relative justify-between items-center">
          <div className="cajaOso z-20 flex flex-col relative justify-center items-center lg:w-1/2 xs:w-1/2 lg:h-full xs:h-1/2">
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
                  <p className="lg:text-4xl xs:text-lg">
                    <span className="text-[var(--yellow)]">ANTES: $80.000</span>
                  </p>
                  <p className="lg:text-6xl xs:text-4xl">
                    <span className="text-[var(--yellow)]">AHORA: $0</span>
                  </p>
                </>
              }
            />
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
                  "Su ojo se cayó, pero gracias al botón que le puso la Abuela Isabel, fue capaz de ver toda una aventura hasta llegar a las manos de su única dueña."
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
                imagen={"/imagenes/heart.webp"}
                texto={
                  "Tiene una cicatriz en el pecho, causada cuando el soldado Ramírez metió en su corazón el mejor regalo que una madre puede recibir."
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
                  "Perdió parte de su relleno, pero este remiendo demuestra que estaba destinado a cumplir esta misión.                  "
                }
              />
            </div>
          </div>
          <div className="cajaCards z-10 flex flex-col lg:w-1/2 xs:w-full lg:border lg:border-white lg:h-full xs:h-1/2 rounded-3xl ">
            <FormSteps
              startRecording={startRecording}
              stopRecording={stopRecording}
              status={isRecording}
              mediaBlobUrl={recordingBlob}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grabadora;
