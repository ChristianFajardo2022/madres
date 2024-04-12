import React from "react";
import ReactPlayer from "react-player";

import { mobile, full, laptop } from "../helpers/medidasResponsive";

const Video = ({ VideoReady, play, url, setPlay }) => {
  return (
    <>
      <ReactPlayer
        onPause={() => setPlay(false)}
        onPlay={() => setPlay(true)}
        onReady={VideoReady}
        playing={play == true ? true : false}
        url={url}
        className="overflow-hidden rounded-3xl"
        width={
          mobile ? "350px" : full ? "1400px" : laptop ? "1000px" : "100%" // Otra condición por defecto si ninguna de las anteriores se cumple
        }
        height={`100%`}
        controls
      />
    </>
  );
};

export default Video;
