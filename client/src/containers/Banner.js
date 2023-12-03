import SearchBarV2 from "@/components/Shared/SearchBarV2";
// import SearchBar from "@/components/Shared/SearchBar";
import React from "react";
// import bannerImage from "../assets/HomeBannerImg.png"

const Banner = () => {
  return (
    <>
      <div
        className="relative mb-36 top-12 h-[65vh]"
        style={{ position: "relative" }}
      >
        <div
          className="absolute bg-center bg-cover sm:bg-contain lg:bg-cover bg-no-repeat z-10 flex justify-center items-center"
          style={{
            backgroundImage: `url("/images/HomeBannerImg.png")`,
            inset: "0px",
          }}
        >
          <div className="sm:mb-32">
            <div className=" text-gray-900 text-center  ">
              <h1 className="text-xl sm:text-2xl lg:text-4xl  mb-[100px] sm:mb-0">
                Book with Ease, Travel with Speed
              </h1>
            </div>
            <div className="flex justify-center mt-10">
              <div className="z-20 flex justify-center -mt-20 sm:-mt-2">
                <SearchBarV2 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
