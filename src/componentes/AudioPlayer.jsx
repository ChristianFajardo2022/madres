import React, { useRef, useState, useEffect } from "react";
import Texto from "./Texto";

const AudioPlayer = ({
  mediaBlobUrl,
  status,
  stopRecording,
  startRecording,
  funcionNext,
  setIrpaso6,
  audiourl,
  setAudiourl,
  setMensaje,
  setBotonAudio,
  setReproducir,
  reproducir,
}) => {
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const linesRef = useRef([]);
  const [currentTime, setCurrentTime] = useState(0); // Nuevo estado para el tiempo transcurrido
  const NUM_LINES = 15; // Número de líneas en la visualización
  const [inicioGrabacion, setInicioGrabacion] = useState("ready");
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
  const [mostrarBotones, setMostrarBotones] = useState(false);

  const [stop, setStop] = useState(false);
  //console.log(mostrarBotones);

  const stopped = () => {
    stopRecording();
    setStop(true);
    setMensaje("Reproduce tu audio, para continuar");
  };
  useEffect(() => {
    if (reproducir) {
      setMensaje("Reproduciendo...");
      reproducirAudio();
      setInicioGrabacion("pausado");
    }
  }, [reproducir]);
  useEffect(() => {
    let intervalo;
    if (status) {
      intervalo = setInterval(() => {
        setTiempoTranscurrido((prev) => prev + 1);
        setCurrentTime((prev) => prev + 1);
      }, 1000);

      const timeoutId = setTimeout(() => {
        stopped();
        setTimeout(() => {
          setInicioGrabacion("reproducir");
        }, 500);
      }, 20000);

      // Limpia el temporizador cuando el efecto se desmonta o cuando se cambia el estado status
      return () => {
        clearInterval(intervalo);
        clearTimeout(timeoutId);
      };
    } else {
      clearInterval(intervalo);
    }
  }, [status]);

  const grabadora = () => {
    if (inicioGrabacion == "ready") {
      startRecording();
      setMensaje("Grabando...");
      setInicioGrabacion("grabando");
    } else if (inicioGrabacion == "grabando") {
      stopped();
      setTiempoTranscurrido(0);

      setInicioGrabacion("reproducir");
      setBotonAudio(true);
    } else if (inicioGrabacion == "reproducir") {
      setMensaje("Reproduciendo...");
      reproducirAudio();
      setInicioGrabacion("pausado");
    } else if (inicioGrabacion == "pausado") {
      detenerAudio();
      setInicioGrabacion("reproducir");
    }
  };

  useEffect(() => {
    if (mediaBlobUrl) {
      const url = URL.createObjectURL(mediaBlobUrl);
      setAudiourl(url);
    }

    if (!audioRef.current) return;

    // Siempre usar un nuevo contexto cuando se cambie la URL del blob
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const updateLines = () => {
      analyser.getByteFrequencyData(dataArray);

      const intensities = [];
      const step = Math.floor(dataArray.length / NUM_LINES);

      for (let i = 0; i < NUM_LINES; i++) {
        let sum = 0;
        for (let j = i * step; j < (i + 1) * step; j++) {
          sum += dataArray[j];
        }
        const intensity = sum / step;
        intensities.push(intensity);
      }

      linesRef.current.forEach((line, index) => {
        const heightPercent = (intensities[index] / 255) * 100;
        line.style.height = `${heightPercent > 0 ? heightPercent : 10}%`; // Establecer altura mínima de 1%
      });
    };

    const intervalId = setInterval(updateLines, 100);

    return () => {
      clearInterval(intervalId);
      audioContext.close(); // Importante cerrar el contexto para liberar recursos
    };
  }, [mediaBlobUrl]); // Dependencia en mediaBlobUrl para reiniciar este efecto

  const reproducirAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();

      // Iniciar el contador
      setCurrentTime(0);
      const intervalId = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1);
      }, 1000);
      // Detener el contador cuando se detiene la reproducción
      audioRef.current.addEventListener("pause", () =>
        clearInterval(intervalId)
      );
      audioRef.current.addEventListener("ended", () => {
        clearInterval(intervalId);
        setMensaje(
          "Repite tu mensaje las veces que quieras hasta que te encante"
        );
        setInicioGrabacion("reproducir");
        setMostrarBotones(true);
        setIrpaso6(true);
        setReproducir(false);
      });
    }
  };

  const detenerAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const formatTime = (time) => {
    if (!time) return "00:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <span
        onClick={grabadora}
        className={`cursor-pointer bg-[--pink] rounded-full w-14 h-14 ${
          inicioGrabacion == "ready"
            ? "p-3"
            : inicioGrabacion == "grabando"
            ? "p-5"
            : "p-5"
        } inline-block relative`}
      >
        <img
          src={`${
            inicioGrabacion == "ready"
              ? "/svg/record.svg"
              : inicioGrabacion == "grabando"
              ? "/svg/stop.svg"
              : inicioGrabacion == "reproducir"
              ? "/svg/play.svg"
              : inicioGrabacion == "pausado"
              ? "/svg/pause.svg"
              : ""
          }`}
          alt=""
        />
      </span>
      {!stop && status && (
        <div className="player record">
          <span className="contadorPlayer mr-2">
            {formatTime(tiempoTranscurrido)}
          </span>
          <div className="lineas-container">
            {[...Array(NUM_LINES)].map((_, index) => (
              <div key={index} className="linea lineaIgrabando"></div>
            ))}
          </div>
        </div>
      )}
      {stop && !status && (
        <>
          <div onClick={grabadora} className="player cursor-pointer">
            <span className="contadorPlayer mr-2">
              {formatTime(currentTime)}
            </span>
            <div className="lineas-container">
              {[...Array(NUM_LINES)].map((_, index) => (
                <div
                  key={index}
                  ref={(el) => (linesRef.current[index] = el)}
                  className="linea"
                ></div>
              ))}
            </div>
          </div>
          <audio ref={audioRef} src={audiourl} controls={false} />
        </>
      )}
      {mostrarBotones && (
        <>
          <span
            onClick={() => {
              startRecording();
              setStop(false);
              setIrpaso6(false);
              setMostrarBotones(false);
              setTimeout(() => {
                setInicioGrabacion("grabando");
              }, 500);
            }}
            className={"btn animateHover mb-4 hoverBtn btnGrabadora"}
          >
            <span className="animateHoverElement w-5 h-5 rounded-full bg-[--pink] border border-[--yellow] inline-block mr-2"></span>
            <Texto title={"Volver a grabar"} />
          </span>

          <span
            onClick={funcionNext}
            className={"cursor-pointer text-center btn hoverBtn btnGrabadora"}
          >
            <Texto title={"Continuar"} />
          </span>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
