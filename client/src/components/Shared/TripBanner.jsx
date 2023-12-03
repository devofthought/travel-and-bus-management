import SearchBarV2 from "@/components/Shared/SearchBarV2";
// import SearchBar from "@/components/Shared/SearchBar";
import React from "react";

const TripBanner = () => {
  return (
    <div
      className="min-h-[25vh] py-5 flex items-center"
      style={{
        backgroundImage: `url("/images/HomeBannerImg.png")`,
        inset: "0px",
      }}
    >
      <div className="main-container">
        <SearchBarV2 />
      </div>
    </div>
  );
};

export default TripBanner;
