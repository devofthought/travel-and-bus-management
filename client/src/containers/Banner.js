import SearchBar from "@/components/Shared/SearchBar";
import React, { useEffect } from "react";

const Banner = ({ handleSearchTrip }) => {
  useEffect(() => {
    const handleScroll = () => {
      const parallaxElement = document.querySelector(".parallax");

      if (parallaxElement) {
        const scrollPosition = window.scrollY;
        parallaxElement.style.transform = `translateY(${
          scrollPosition * 0.3
        }px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className="relative h-96 top-12"
        style={{ position: "relative", height: "500px" }}
      >
        <div
          className="parallax absolute inset-0 bg-center bg-cover z-10"
          style={{
            backgroundImage: `url(${"/images/banner-img.jpg"})`,
            position: "absolute",
            inset: "0px",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div
            className="absolute inset-0 bg-black opacity-50"
            style={{
              position: "absolute",
              inset: "0px",
              backgroundColor: "black",
              opacity: "70%",
            }}
          ></div>
        </div>
        <div
          className="flex items-center justify-center h-96 text-white text-center"
          style={{ height: "100%", color: "white", position: "inherit" }}
        >
          <div>
            <h1 className="text-4xl font-bold" style={{ fontSize: "100px" }}>
              Dhruto Travel
            </h1>
            <p style={{ textAlign: "center", fontSize: "24px" }}>
              Book with Ease, Travel with Speed
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-white h-[250px]">
        <div className="absolute z-20 flex justify-center -mt-20 sm:-mt-10 lg:-mt-2">
          <SearchBar handleSearchTrip={handleSearchTrip} />
        </div>
      </div>
    </>
  );
};

export default Banner;
