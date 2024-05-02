import gsap from "gsap";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationdata from "../lotties/test.json";
import paso2 from "../lotties/paso2.json";
import hands from "../lotties/hands.json";
const Onboarding = ({ setOnboarding }) => {
  const [paso, setPaso] = useState(0);

  useEffect(() => {
    gsap.to(".onboar1", {
      opacity: 1,
      ease: "power1.inOut",
      duration: 0.5,
      delay: 0.5,
    });

    gsap.to(".textNimate", {
      opacity: 1,

      stagger: 0.5,
      ease: "power1.inOut",
      duration: 0.5,
      delay: 0.5,
    });
    gsap.to(".lottie", {
      opacity: 1,
      ease: "power1.inOut",
      duration: 0.5,
    });
    gsap.to(".marco", {
      opacity: 1,
      ease: "power1.inOut",
      duration: 0.5,
    });
  }, [paso]);
  return (
    <div className="text-white slidecards w-full h-full  relative items-center justify-center flex flex-col">
      <div className="onboar1 lg:w-full xs:w-full sm:w-3/4 opacity-0 flex lg:justify-between xs:justify-evenly lg:h-[65%] xs:h-full flex-col items-center ">
        {paso == 0 && (
          <>
            <span className="lg:w-1/2 xs:w-3/5 inline-block lg:mb-12">
              <img src="/svg/logo-operacion-mayo.svg" alt="" />
            </span>
            <div
              style={{
                backgroundImage: "url(/svg/marco.svg)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right",
              }}
              className="cajaLottie flex items-center max-lg:w-4/5 justify-between"
            >
              <span className="lottie inline-block w-1/2 mr-10 h-auto">
                <Lottie animationData={animationdata} />
              </span>
              <h1 className="textNimate tracking-[-1px] font-inter font-semibold text-[--yellow] w-1/2 inline-block 2xl:text-[2.2rem] 2xl:leading-[2.5rem] lg:text-5xl xs:text-2xl">
                Un homenaje <br /> a todos los que <br /> entendieron <br />
                la entrega de <br />
                ser mamá
              </h1>
            </div>
            <button
              className="btn 2xl:text-2xl sm:text-3xl xs:text-2xl"
              onClick={() => setPaso(1)}
            >
              Siguiente
            </button>
          </>
        )}
        {paso == 1 && (
          <>
            <h2 className="textNimate   text-center tracking-[-1px] font-inter font-semibold text-[--yellow] sm:w-1/2 xs:w-[80%] inline-block 2xl:text-[2.2rem] 2xl:leading-[2.5rem] lg:text-5xl xs:text-2xl">
              A las abuelas, papás, hermanos, tíos o a quien haya asumido este
              rol en tu vida,
            </h2>
            <span className="relative lottie inline-block sm:w-1/2 xs:w-[65%]  h-auto">
              <Lottie animationData={paso2} />
              <span className="w-full textNimate absolute lg:bottom-14 sm:bottom-12 xs:bottom-8 text-center tracking-[-1px] font-inter font-semibold text-[--yellow] inline-block 2xl:text-3xl lg:text-3xl xs:text-xl">
                Celébrales su día <br />
                con un oso igual a este
              </span>
            </span>
            <button
              className="btn 2xl:text-2xl sm:text-3xl xs:text-2xl"
              onClick={() => setPaso(2)}
            >
              Siguiente
            </button>
          </>
        )}
        {paso == 2 && (
          <>
            <div className="lg:w-1/2 xs:w-3/4 sm:h-3/4 xs:h-1/2 relative">
              <span className="marco floatcenter w-full h-auto">
                <img className="" src="/svg/marco2.svg" alt="" />
              </span>
              <h2 className="textNimate floatcenter text-center tracking-[-1px] font-inter font-semibold text-[--yellow] w-1/2 inline-block xl:text-3xl xs:text-xl">
                Gracias por hacer <br />
                parte de esta entrega
              </h2>
              <span className="floatcenter lottie inline-block w-full h-auto">
                <Lottie animationData={hands} />
              </span>
            </div>
            <button
              className="z-50 btn active 2xl:text-2xl sm:text-3xl xs:text-2xl"
              onClick={() => setOnboarding(false)}
            >
              Iniciar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
