import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="bg-white">
      <div className="error cajaParaelementos maxW fixed z-50 rounded-3xl bg-[#dadada]  top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] xl:w-[80%] xs:w-[80%] xl:h-[80%] xl:max-h-[874px] xs:h-[80%] ">
        <span className="w-20 inline-block relative lg:translate-x-[-1rem] xs:translate-x-[-0.4rem]">
          <img
            className="w-full h-full object-cover"
            src="/svg/error.svg"
            alt=""
          />
        </span>
        <h1 className=" lg:text-7xl xs:text-2xl">Error</h1>
        <h1 className=" lg:text-[12rem] xs:text-7xl lg:leading-[10rem] xs:leading-[4rem] font-black">
          404
        </h1>
        <p className="text-center">OOPS! PÁGINA NO ENCONTRADA</p>
        <Link to={"/paramo"} className="border-b-2 pb-[2px]">
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
