import React from "react";

const HamburgesaIcon = ({ active, handleClick }) => {
  return (
    <span
      onClick={handleClick}
      className={`${
        active ? "active" : ""
      } burgerIcon cursor-pointer z-[101] flex flex-col justify-between absolute lg:right-20 lg:top-20 xs:right-4 xs:top-6 w-7 h-6`}
    >
      <div className="lineBurger lineBurger1 "></div>
      <div className="lineBurger lineBurger2 "></div>
      <div className="lineBurger lineBurger3 "></div>
    </span>
  );
};

export default HamburgesaIcon;
