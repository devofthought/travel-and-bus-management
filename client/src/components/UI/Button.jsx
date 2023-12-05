import React from "react";

const Button = ({ styles, btnName }) => {
  return (
    <>
      <button
        type="submit"
        className={`${styles} main-button primary-bg text-white border-none rounded-[5px] cursor-pointer text-center transition-transform active:scale-95 hover:opacity-75 shadow`}
      >
        {btnName}
      </button>
    </>
  );
};

export default Button;
