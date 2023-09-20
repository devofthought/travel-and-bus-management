import FAQ from "@/containers/HomePage/FAQ";
import OurBuses from "@/containers/HomePage/OurBuses";
import ReserveABus from "@/containers/HomePage/ReserveABus";
import Review from "@/containers/HomePage/Review";
import SaySomething from "@/containers/HomePage/SaySomething";
import WhatWeOffer from "@/containers/HomePage/WhatWeOffer";
import Banner from "@/containers/Banner";
import Technologies from "@/containers/HomePage/Technologies";
import React from "react";
import RootLayout from "@/layouts/RootLayout";
import OurExclusiveOffer from "@/containers/HomePage/OurExclusiveOffer";
import ExclusiveOffer from "@/containers/HomePage/ExclusiveOffer";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <Technologies />
      <WhatWeOffer />
      <ReserveABus />
      {/* <OurExclusiveOffer /> */}
      <ExclusiveOffer />
      <Review />
      <FAQ />
      <OurBuses />
      <SaySomething />
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
