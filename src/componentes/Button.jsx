import React from "react";
import Texto from "./Texto";

const Button = ({ type, handleClick, custoMStyle, title }) => {
  return (
    <button
      type={`${type ? "submit" : null}`}
      className={`${custoMStyle} btn  cursor-pointer`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
