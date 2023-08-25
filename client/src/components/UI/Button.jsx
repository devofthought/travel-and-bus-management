import Link from "next/link";
import React from "react";

const Button = ({ styles, btnName, href, textStyle }) => {
  return (
    <div className={styles}>
      <Link
        className={(textStyle && "flex items-center justify-center") || ""}
        href={href || "#"}
      >
        {btnName}
      </Link>
    </div>
  );
};

export default Button;
