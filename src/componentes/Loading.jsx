import React, { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const LoadingEnd = ({ setVideoLoaded, videoLoaded, progress, setchange }) => {
  useEffect(() => {
    Pace.on("done", function () {
      // Actualiza solo el segundo elemento del array
      setVideoLoaded((prevState) => [prevState[1], true]);
    });
  }, [videoLoaded]);

  return (
    <div className="w-full h-full bg-slate-900 flex-center">
      <ProgressBar progress={progress} setchange={setchange} />
    </div>
  );
};
export default LoadingEnd;
