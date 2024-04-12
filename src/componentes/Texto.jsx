import React from "react";

const Texto = ({ title, customstyle }) => {
  return (
    <span
      className={`${
        customstyle ? customstyle : ""
      } textocustom inline-block ajusteFuente`}
    >
      {title}
    </span>
  );
};

export default Texto;
