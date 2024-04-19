import React, { useEffect } from "react";

const LoadingEnd = () => {
  return (
    <div className="loading w-full h-full bg-black flex items-center fixed z-[150] justify-center">
      <span className="text-white">cargando...</span>
    </div>
  );
};
export default LoadingEnd;
