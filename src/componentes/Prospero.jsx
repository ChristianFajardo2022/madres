import React from "react";
import { Link } from "react-router-dom";

const Prospero = ({ customStyle }) => {
  return (
    <Link to="/grabar-audio">
      <span
        className={`${customStyle} prospero absolute z-50  inline-block w-6 h-auto`}
      >
        <img
          src="/svg/prospero.svg"
          alt="Logo inter rapidísimo homenaje a las madres"
        />
      </span>
    </Link>
  );
};

export default Prospero;
