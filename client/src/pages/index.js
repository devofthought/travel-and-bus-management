import Banner from "@/containers/Banner";
import Technologies from "@/containers/Technologies";
import React from "react";
          
const HomePage = () => {
  return (
    <div>
      <Banner/>
      <Technologies/>
      <div className="h-screen"></div>
    </div>
  );
};

export default HomePage;
