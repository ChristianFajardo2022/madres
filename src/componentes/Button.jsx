import React from "react";
import Texto from "./Texto";

const Button = ({ handleClick, custoMStyle, title }) => {
  return (
    <button className={`${custoMStyle} btn`} onClick={handleClick}>
      <Texto title={title} />
    </button>
  );
};

export default Button;
