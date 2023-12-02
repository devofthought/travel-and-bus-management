"use client";
import SecondaryBanner from "@/components/Shared/SecondaryBanner";
import ReviewTable from "@/containers/UserDashboard/reviewTable";
import { Segmented } from "antd";
import withAuth from "@/utils/withAuth";
import dynamic from "next/dynamic";
import { useState } from "react";
import IncompleteTourAndBooking from "@/containers/UserDashboard/IncompleteTourAndBooking";
import MyTourHistoryTable from "@/containers/UserDashboard/myTourHistoryTable";

const UserDashboardLayout = () => {
  const segmentOptions = [
    "My tour history",
    "Incomplete tour & booking",
    "Reviews",
  ];
  const [selectedOption, setSelectedOption] = useState("My tour history");
  const [openDashboard, setOpenDashboard] = useState(true);

  return (
    <>
      <div className="z-50">
        <SecondaryBanner
          openDashboard={openDashboard}
          setOpenDashboard={setOpenDashboard}
        />

        <div className="min-h-[500px]">
          {openDashboard && (
            <div className="w-4/5 md:w-2/3 mx-auto mt-20 ">
              <Segmented
                size="large"
                block
                options={segmentOptions}
                className="custom-segmented-button" // Add this line to apply the custom class
                onChange={(value) => setSelectedOption(value)}
                style={{ marginBottom: "10px" }}
              />
              {/* <div className="overflow-x-auto"> */}
                {selectedOption === "My tour history" && <MyTourHistoryTable />}
                {selectedOption === "Incomplete tour & booking" && (
                  <IncompleteTourAndBooking />
                )}
                {selectedOption === "Reviews" && <ReviewTable />}
              </div>
            // </div>
          )}
        </div>
      </div>
    </>
  );
};

export default dynamic(
  () => Promise.resolve(withAuth(UserDashboardLayout, ["traveler"])),
  { ssr: true }
);
