import { Segmented } from "antd";
import { useState } from "react";
import MyTourAndTripsTable from "./tables/myTourAndTripsTable";
import UpcomingBookingTable from "./tables/upcomingBookingTable";
import ReviewTable from "./tables/reviewTable";

const UserDashboard = () => {
  const segmentOptions = ["My tour & trips", "Upcoming booking", "Reviews"];
  const [selectedOption, setSelectedOption] = useState(segmentOptions[0]);

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

  const reviewData = [
    {
      sr: 1,
      feedback_for: "Bus",
      feedback_details: "Great service and comfortable seats!",
      stars: 5,
    },
    {
      sr: 2,
      feedback_for: "Driver",
      feedback_details: "Bus was late and seats were not comfortable.",
      stars: 2,
    },
    {
      sr: 3,
      feedback_for: "Driver",
      feedback_details: "Excellent trip, friendly staff!",
      stars: 4,
    },
    {
      sr: 4,
      feedback_for: "Bus",
      feedback_details: "Average experience, nothing special.",
      stars: 3,
    },
    {
      sr: 5,
      feedback_for: "Bus",
      feedback_details: "Terrible trip, bus broke down midway.",
      stars: 1,
    },
  ];

  return (
    <div className="h-screen z-50">
      <div className="w-2/3 mx-auto">
        <Segmented
          size="large"
          block
          options={segmentOptions}
          onChange={(value) => setSelectedOption(value)}
        />
        {selectedOption === "My tour & trips" && (
          <MyTourAndTripsTable data={myTourAndTripData} />
        )}
        {selectedOption === "Upcoming booking" && (
          <UpcomingBookingTable data={upcomingBookingData} />
        )}
        {selectedOption === "Reviews" && <ReviewTable data={reviewData} />}
      </div>
    </div>
  );
};

export default UserDashboard;