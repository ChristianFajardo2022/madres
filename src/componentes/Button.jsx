import React from "react";
import Texto from "./Texto";

const Button = ({ type, handleClick, custoMStyle, title }) => {
  return (
    <span
      type={`${type ? "submit" : null}`}
      className={`${custoMStyle} btn hoverBtn cursor-pointer`}
      onClick={handleClick}
    >
      {title}
    </span>
  );
};

export default Button;
