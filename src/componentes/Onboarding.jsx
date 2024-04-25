import gsap from "gsap";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationdata from "../lotties/test.json";
const Onboarding = ({ setOnboarding }) => {
  const [paso, setPaso] = useState(0);

  useEffect(() => {
    gsap.to(".onboar1", {
      opacity: 1,
      ease: "power1.inOut",
      duration: 0.5,
      delay: 0.5,
    });

    gsap.to(".onboar2", {
      opacity: 1,
      ease: "power1.inOut",
      duration: 0.5,
      delay: 0.5,
    });
  }, [paso]);
  return (
    <div className="text-white slidecards w-full h-full lg:relative items-center justify-center flex flex-col">
      {paso == 0 && (
        <div className="onboar1 opacity-0">
          Titulo del Onboarding...
          {/* <Lottie animationData={animationdata} /> */}
          <button onClick={() => setPaso(1)}>Siguiente</button>
        </div>
      )}
      {paso == 1 && (
        <div className="onboar2 opacity-0">
          Onboarding 2...
          <button onClick={() => setOnboarding(false)}>Siguiente</button>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
