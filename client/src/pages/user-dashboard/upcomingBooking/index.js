import UpcomingBookingTable from "@/containers/UserDashboard/upcomingBookingTable";
import RootLayout from "@/layouts/RootLayout";
import UserDashboardLayout from "@/layouts/UserDashboardLayout";
import React from "react";

const UpcomingBooking = () => {
  const upcomingBookingData = [
    {
      sr: 1,
      from: "Hogsmeade",
      to: "Diagon Alley",
      departure_time: "2023-09-01 08:00 AM",
      arrival_time: "2023-09-01 10:00 AM",
      bus_code: "BUS123",
      distance: "15 km",
      fare: "$50",
      seats: 2,
      payment_status: "Paid",
    },
    {
      sr: 2,
      from: "Hogwarts",
      to: "The Burrow",
      departure_time: "2023-09-02 09:30 AM",
      arrival_time: "2023-09-02 12:00 PM",
      bus_code: "BUS456",
      distance: "10 km",
      fare: "$3",
      seats: 3,
      payment_status: "Pending",
    },
    {
      sr: 3,
      from: "Leaky Cauldron",
      to: "Azkaban",
      departure_time: "2023-09-03 11:00 AM",
      arrival_time: "2023-09-03 03:00 PM",
      bus_code: "BUS789",
      distance: "25 km",
      fare: "$8",
      seats: 1,
      payment_status: "Paid",
    },
    {
      sr: 4,
      from: "Quidditch Stadium",
      to: "Ministry of Magic",
      departure_time: "2023-09-04 02:00 PM",
      arrival_time: "2023-09-04 04:30 PM",
      bus_code: "BUS234",
      distance: "18 km",
      fare: "$6",
      seats: 4,
      payment_status: "Paid",
    },
    {
      sr: 5,
      from: "Diagon Alley",
      to: "Forbidden Forest",
      departure_time: "2023-09-05 10:30 AM",
      arrival_time: "2023-09-05 01:00 PM",
      bus_code: "BUS567",
      distance: "12 km",
      fare: "$4",
      seats: 4,
      payment_status: "Pending",
    },
  ];

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
