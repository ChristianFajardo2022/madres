import React from "react";
import Button from "./Button";
import Texto from "./Texto";

const IconPlayVideo = ({ setOnPlay, onplay }) => {
  return (
    <Button
      handleClick={() => {
        if (onplay) {
          setOnPlay(false);
        } else {
          setOnPlay(true);
        }
      }}
      custoMStyle={` z-10 btn text-xl vimeo iconPlay ${
        !onplay ? "active" : ""
      }`}
      title={
        <>
          <>
            {onplay && (
              <span className="inline-block  ">
                <img src="/iconplay.gif" alt="" />
              </span>
            )}
            <span className="Bebas ml-1">{onplay ? "off" : "on"}</span>
          </>
        </>
      }
    />
  );
};

export default IconPlayVideo;
