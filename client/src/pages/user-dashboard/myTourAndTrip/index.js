import MyTourAndTripsTable from "@/containers/UserDashboard/myTourHistoryTable";
import { myTourAndTripData } from "@/data/userDashboard/userDashboardData";
import RootLayout from "@/layouts/RootLayout";
import UserDashboardLayout from "@/layouts/UserDashboardLayout";
import React from "react";

const MyTourAndTrip = () => {
 

  return (
    <div>
      <MyTourAndTripsTable data={myTourAndTripData} />
    </div>
  );
};

export default MyTourAndTrip;

MyTourAndTrip.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <UserDashboardLayout>{page}</UserDashboardLayout>
    </RootLayout>
  );
};
