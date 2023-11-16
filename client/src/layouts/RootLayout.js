import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import TopLoader from "@/components/Shared/TopLoader";
import React from "react";

const RootLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <TopLoader />
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
