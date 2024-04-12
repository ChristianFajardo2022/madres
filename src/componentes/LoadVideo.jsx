import React from "react";

const loadVideo = ({ customStyle, url, videoLoad, end, loop }) => {
  return (
    <video
      ref={videoLoad}
      className={`${customStyle} w-full h-full object-cover`}
      src={url}
      autoPlay
      loop={loop ? true : false}
      muted
      onEnded={end}
    />
  );
};

export default loadVideo;
