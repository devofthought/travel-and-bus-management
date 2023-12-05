import React from "react";

const Button = ({ styles, btnName, isLoading }) => {
  return (
    <>
      <button
        type="submit"
        disabled={isLoading ? true : false}
        className={`${styles} main-button primary-bg text-white border-none rounded-[5px] cursor-pointer text-center transition-transform active:scale-95 hover:opacity-75 shadow`}
      >
        {isLoading ? "Loading..." : btnName}
      </button>
    </>
  );
};

export default Button;
