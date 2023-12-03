import SearchBar from "@/components/Shared/SearchBarV2";
import React from "react";
// import bannerImage from "../assets/HomeBannerImg.png"

const TripBanner = ({ handleSearchTrip }) => {
  return (
    <>
      <div
        className="relative mb-36 top-12 h-[50vh]"
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
            <div className="flex justify-center mt-10">
              <div className="z-20 flex justify-center -mt-20 sm:-mt-2">
                <SearchBar handleSearchTrip={handleSearchTrip} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripBanner;
