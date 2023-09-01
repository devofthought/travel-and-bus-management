import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import React from "react";

const RootLayout = ({ children }) => {
  return (
    <div>
      {/* <Navbar /> */}
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
