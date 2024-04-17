import React from "react";

import { useNavigate } from "react-router-dom";
import Texto from "../componentes/Texto";
import FormSteps from "../componentes/FormSteps";

import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

function Grabadora() {
  /* const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      mimeType: "audio/wav",
    }); */
  const navigate = useNavigate();

  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder();

  const handleAudioSave = () => {
    navigate("/formulario", { state: { mediaRecorder } });
  };

  const ExampleComponent = () => {
    const recorderControls = useAudioRecorder();
    const addAudioElement = (blob) => {
      const url = URL.createObjectURL(blob);
      const audio = document.createElement("audio");
      audio.src = url;
      audio.controls = true;
      document.body.appendChild(audio);
    };

    return (
      <div>
        <AudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
        />
        <button onClick={recorderControls.stopRecording}>Stop recording</button>
      </div>
    );
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
            <ExampleComponent />
            {/* <FormSteps
              startRecording={startRecording}
              stopRecording={stopRecording}
              status={status}
              mediaBlobUrl={mediaBlobUrl}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grabadora;
