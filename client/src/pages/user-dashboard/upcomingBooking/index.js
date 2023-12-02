import UpcomingBookingTable from "@/containers/UserDashboard/IncompleteTourAndBooking";
import { upcomingBookingData } from "@/data/userDashboard/userDashboardData";
import RootLayout from "@/layouts/RootLayout";
import UserDashboardLayout from "@/layouts/UserDashboardLayout";
import React from "react";

const UpcomingBooking = () => {
  
  return (
    <div>
      <UpcomingBookingTable data={upcomingBookingData} />
    </div>
  );
};

export default UpcomingBooking;

UpcomingBooking.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <UserDashboardLayout>{page}</UserDashboardLayout>
    </RootLayout>
  );
};
