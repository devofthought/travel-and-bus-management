import React from "react";

const Tooltip = ({ children, title }) => {
  return (
    <div>
      <span className="group relative">
        <div className="absolute bottom-[calc(100%+0.5rem)] left-[37%] -translate-x-[50%] hidden group-hover:block w-auto">
          <div className="bottom-full right-0 rounded bg-gray-300 px-3 py-1 text-xs text-black whitespace-nowrap">
            {title}
            <svg
              className="absolute left-0 top-full h-2 w-full text-gray-300"
              x="0px"
              y="0px"
              viewBox="0 0 255 255"
            >
              <polygon
                className="fill-current"
                points="0,0 127.5,127.5 255,0"
              />
            </svg>
          </div>
        </div>
        <span>{children}</span>
      </span>
    </div>
  );
};

export default Tooltip;
