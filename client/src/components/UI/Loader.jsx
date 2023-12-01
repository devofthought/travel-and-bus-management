import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="h-48">
      <div className="flex items-center justify-center">
        <div>
          <div className="flex items-center space-x-2 animate-slide">
            <Image src="/bus.png" height={100} width={100} alt="bus" />
          </div>
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
