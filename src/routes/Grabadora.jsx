import React from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useNavigate } from "react-router-dom";

function Grabadora() {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });
  const navigate = useNavigate();

  const handleAudioSave = () => {
    navigate("/formulario", { state: { mediaBlobUrl } });
  };

  return (
    <div className="w-full h-screen">
        <div className="w-full h-[10%] my-5">
        <h1 className=" text-5xl text-center">DIA MADRES</h1>
        </div>
        <div className="w-full h-[90%] flex justify-center items-center">
      <div className="flex justify-center items-center w-[45%] bg-slate-200 rounded-xl">
        <img src="/oso.png" className="w-[80%]" />
        <p className="py-4">{status}</p>
        <button
          onClick={startRecording}
          className="py-4 bg-red-700 rounded-xl text-white w-28 absolute top-[60%]"
        >
          Grabar
        </button>
      </div>
      <div className="flex flex-col">
        <button
          onClick={stopRecording}
          className="py-4 bg-red-700 rounded-xl text-white w-28 m-4"
        >
          Detener Grabación
        </button>
        <button
          onClick={handleAudioSave}
          disabled={!mediaBlobUrl}
          className="py-4 bg-red-700 rounded-xl text-white w-28 m-4"
        >
          Continuar
        </button>
        <audio src={mediaBlobUrl || ""} controls className={!mediaBlobUrl ? "" : ""} />
      </div>
      </div>
    </div>
  );
}

export default Grabadora;
