import React from "react";

const AudioRecorder = () => {
  return (
    <>
      <button
        onClick={startRecording}
        className="py-4 bg-red-700 rounded-xl text-white w-28 absolute top-[60%]"
      >
        Grabar
      </button>
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
      <audio
        src={mediaBlobUrl || ""}
        controls
        className={!mediaBlobUrl ? "" : ""}
      />
    </>
  );
};

export default AudioRecorder;
