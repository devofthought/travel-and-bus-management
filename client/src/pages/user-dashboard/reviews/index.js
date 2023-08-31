import ReviewTable from "@/containers/UserDashboard/reviewTable";
import UserDashboardLayout from "@/layouts/UserDashboardLayout";
import React from "react";

const Reviews = () => {
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
    <div>
      <ReviewTable data={reviewData} />
    </div>
  );
};

export default Reviews;

Reviews.getLayout = function getLayout(page) {
  return <UserDashboardLayout>{page}</UserDashboardLayout>;
};
