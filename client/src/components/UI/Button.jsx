import React from "react";

const Button = ({ styles, btnName, textStyle }) => {
  return (
    <div className={`${styles} cursor-pointer`}>
      <div className={(textStyle && "flex items-center justify-center") || ""}>
        {btnName}
      </div>
    </div>
  );
};

export default Button;
