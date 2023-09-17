import React from "react";

const Button = ({ styles, btnName }) => {
  return (
    <> 
      <button
        type="submit"
        className={`${styles} primary-bg text-white border-none rounded-[5px] cursor-pointer text-center`}
      >
        {btnName}
      </button>
    </>
  );
};

export default Button;
