import React, { useEffect, useRef, useState } from "react";
import Video from "./Video";
import gsap from "gsap";
import { Link } from "react-router-dom";

const Comercial = ({ playVideo, setPlayVideo }) => {
  const [close, setClose] = useState(false);
  const [ancho, setAncho] = useState(0);

  useEffect(() => {
    if (playVideo) {
      const tl = gsap.timeline();

      tl.to(".comercial", {
        pointerEvents: "all",
        visibility: "visible",
        opacity: 1,
        ease: "power1.inOut",
        duration: 1,
      });
      tl.to(".boxVideo", {
        opacity: 1,
        ease: "power1.inOut",
        duration: 1,
      });
      tl.add(() => setClose(false));
    }
  }, [playVideo]);

  useEffect(() => {
    if (close) {
      const tl = gsap.timeline();
      tl.add(() => setPlayVideo(false));
      tl.to(".boxVideo", {
        opacity: 0,
        ease: "power1.inOut",
        duration: 0.2,
      });
      tl.to(".comercial", {
        pointerEvents: "none",
        visibility: "hidden",
        opacity: 0,
        ease: "power1.inOut",
        duration: 0.5,
      });
    }
  }, [close]);

  const card = useRef(null);

  return (
    <div className="comercial pointer-events-none invisible opacity-0 fixed w-full h-full top-0 left-0 bg-black z-[2000]">
      <span
        onClick={() => setClose(true)}
        className="z-50 cursor-pointer inline-block absolute w-5 h-5 right-12 top-12"
      >
        <img src="/svg/close.svg" alt="" />
      </span>
      <div
        className={`boxVideo opacity-0 z-[9] lg:w-[70%] xs:w-full h-full floatcenter  py-4 flex flex-col justify-center items-center`}
      >
        <Video
          play={playVideo}
          url={"https://www.youtube.com/watch?v=YBGU3g6Tbrk"}
        />
      </div>
    </div>
  );
};

export default Comercial;
