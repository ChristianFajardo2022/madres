import React from "react";
import Texto from "./Texto";

const Button = ({ type, handleClick, custoMStyle, title }) => {
  return (
    <button
      type={`${type ? "submit" : null}`}
      className={`${custoMStyle} btn hoverBtn`}
      onClick={handleClick}
    >
      <Texto title={title} />
    </button>
  );
};

export default Button;
