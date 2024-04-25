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
        <div className="onboar1 opacity-0 flex justify-between h-3/4 flex-col items-center">
          <span className="w-full inline-block mb-12">
            <img src="/logo-operacion-mayo.svg" alt="" />
          </span>
          <div
            style={{
              backgroundImage: "url(/svg/marco.svg)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right",
            }}
            className="cajaLottie flex items-center w-full justify-between "
          >
            <span className="lottie inline-block w-1/2 mr-10 h-auto">
              <Lottie animationData={animationdata} />
            </span>
            <span className=" tracking-[-1px] font-inter font-semibold text-[--yellow] w-1/2 inline-block 2xl:text-[2.2rem] 2xl:leading-[2.5rem] lg:text-5xl">
              Un homenaje <br /> a todos los que <br /> entendieron <br />
              la entrega de <br />
              ser mamá
            </span>
          </div>
          <button
            className="btn 2xl:text-2xl sm:text-3xl"
            onClick={() => setPaso(1)}
          >
            Siguiente
          </button>
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
