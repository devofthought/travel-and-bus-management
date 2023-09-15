import React from "react";

const Button = ({ styles, btnName, textStyle }) => {
  return (
    <div
      className={`${styles} primary-bg text-white rounded-[5px] text-base font-medium cursor-pointer`}
    >
      <div className={(textStyle && "flex items-center justify-center") || ""}>
        {btnName}
      </div>
    </div>
  );
};

export default Button;
