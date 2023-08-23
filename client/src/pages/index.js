import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import FAQ from "@/containers/HomePage/FAQ";
import Hero from "@/containers/HomePage/Hero";
import OurBuses from "@/containers/HomePage/OurBuses";
import ReserveABus from "@/containers/HomePage/ReserveABus";
import Review from "@/containers/HomePage/Review";
import SaySomething from "@/containers/HomePage/SaySomething";
import WhatWeOffer from "@/containers/HomePage/WhatWeOffer";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
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
