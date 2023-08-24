import Link from "next/link";
import React from "react";

const Button = ({ styles, btnName, href, linkClass }) => {
  return (
    <div className={styles}>
      <Link
        className={(linkClass && "flex items-center justify-center") || ""}
        href={href || "#"}
      >
        {btnName}
      </Link>
    </div>
  );
};

export default Button;
