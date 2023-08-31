import MyTourAndTripsTable from "@/containers/UserDashboard/myTourAndTripsTable";
import RootLayout from "@/layouts/RootLayout";
import UserDashboardLayout from "@/layouts/UserDashboardLayout";
import React from "react";

const MyTourAndTrip = () => {
  const myTourAndTripData = [
    {
      sr: 1,
      from: "Hogwarts",
      to: "Hogsmeade",
      distance: "10 km",
      fare: "5 galleons",
      seats: 10,
      trip_status: "On-time",
      feedback: "pending",
    },
    {
      sr: 2,
      from: "Diagon Alley",
      to: "Forbidden Forest",
      distance: "15 km",
      fare: "8 galleons",
      seats: 8,
      trip_status: "Delayed",
      feedback: "done",
    },
    {
      sr: 3,
      from: "The Burrow",
      to: "Quidditch Stadium",
      distance: "5 km",
      fare: "3 galleons",
      seats: 15,
      trip_status: "Completed",
      feedback: "done",
    },
    {
      sr: 4,
      from: "Privet Drive",
      to: "Leaky Cauldron",
      distance: "12 km",
      fare: "6 galleons",
      seats: 12,
      trip_status: "Cancelled",
      feedback: "pending",
    },
    {
      sr: 5,
      from: "Azkaban",
      to: "Ministry of Magic",
      distance: "20 km",
      fare: "10 galleons",
      seats: 5,
      trip_status: "On-time",
      feedback: "done",
    },
  ];

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
