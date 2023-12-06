import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
// import NoticeBoard from "@/components/Shared/NoticeBoard";
import TopLoader from "@/components/Shared/TopLoader";
import React from "react";

const RootLayout = ({ children }) => {
  return (
    <div>
      {/* <NoticeBoard /> */}
      <Navbar />
      <TopLoader />
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
