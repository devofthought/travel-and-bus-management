import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import FAQ from "@/containers/HomePage/FAQ";
import OurBuses from "@/containers/HomePage/OurBuses";
import ReserveABus from "@/containers/HomePage/ReserveABus";
import Review from "@/containers/HomePage/Review";
import SaySomething from "@/containers/HomePage/SaySomething";
import WhatWeOffer from "@/containers/HomePage/WhatWeOffer";
import Banner from "@/containers/Banner";
import Technologies from "@/containers/Technologies";
import React from "react";
import UserDashboard from "@/containers/UserDashboard/userDashboard";
          
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Technologies />
      <WhatWeOffer />
      <ReserveABus />
      <Review />
      <FAQ />
      <OurBuses />
      <SaySomething />
      <Footer />
    </div>
  );
};

export default HomePage;
