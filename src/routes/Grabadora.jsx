import React from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useNavigate } from "react-router-dom";
import Texto from "../componentes/Texto";
import FormSteps from "../componentes/FormSteps";

function Grabadora() {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });
  const navigate = useNavigate();

  const handleAudioSave = () => {
    navigate("/formulario", { state: { mediaBlobUrl } });
  };

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full  ">
        <img
          className="absolute left-0 z-[-1]"
          src="/background/bg-oso.jpg"
          alt=""
        />
        <div className="p-8 w-full h-full flex justify-between items-center">
          <div className="flex flex-col relative justify-center items-center lg:w-1/2 xs:w-full h-full">
            {/*           <p className="py-4">{status}</p> */}
            <Texto
              customstyle={"absolute bottom-0"}
              title={
                <>
                  <p className="text-3xl">
                    <span className="text-white">ANTES: </span>
                    <span className="text-[var(--yellow)]">$80.000 </span>
                  </p>
                  <p className="text-6xl">
                    <span className="text-white">AHORA:</span>
                    <span className="text-[var(--yellow)]">$0</span>
                  </p>
                </>
              }
            />
          </div>
          <div className="flex flex-col lg:w-1/2 xs:w-full border border-white h-full rounded-3xl ">
            <FormSteps
              startRecording={startRecording}
              stopRecording={stopRecording}
              status={status}
              mediaBlobUrl={mediaBlobUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grabadora;
