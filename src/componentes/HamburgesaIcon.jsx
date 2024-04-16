import React from "react";

const HamburgesaIcon = () => {
  return (
    <span className="burgerIcon flex flex-col justify-between absolute right-12 top-12 w-8 h-6">
      <div style={{ transform: "rotate(45deg)" }} className="lineBurger"></div>
      <div className="lineBurger active"></div>
      <div className="lineBurger absolute bottom-0"></div>
    </span>
  );
};

export default HamburgesaIcon;
