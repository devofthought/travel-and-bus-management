"use client";
import SecondaryBanner from "@/components/Shared/SecondaryBanner";
import MyTourAndTripsTable from "@/containers/UserDashboard/myTourAndTripsTable";
import ReviewTable from "@/containers/UserDashboard/reviewTable";
import UpcomingBookingTable from "@/containers/UserDashboard/upcomingBookingTable";
import { reviewData } from "@/data/userDashboard/userDashboardData";
import { Segmented } from "antd";
import withAuth from "@/utils/withAuth";
import dynamic from "next/dynamic";
import { useState } from "react";

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
            <div className="w-2/3 mx-auto mt-20">
              <Segmented
                size="large"
                block
                options={segmentOptions}
                className="custom-segmented-button" // Add this line to apply the custom class
                onChange={(value) => setSelectedOption(value)}
              />
              {selectedOption === "My tour history" && <MyTourAndTripsTable />}
              {selectedOption === "Incomplete tour & booking" && (
                <UpcomingBookingTable />
              )}
              {selectedOption === "Reviews" && (
                <ReviewTable data={reviewData} />
              )}
            </div>
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
