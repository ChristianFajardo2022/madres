import React from "react";

const loadVideo = ({
  customStyle,
  url,
  videoLoad,
  end,
  loop,
  onLoadedData,
  handleClick,
}) => {
  return (
    <video
      ref={videoLoad}
      className={`${customStyle ? customStyle : ""} w-full h-full object-cover`}
      src={url}
      autoPlay
      loop={loop ? true : false}
      muted
      onEnded={end ? end : null}
      onLoadedData={onLoadedData ? onLoadedData : null}
      onClick={handleClick ? handleClick : null}
    />
  );
};

export default loadVideo;
