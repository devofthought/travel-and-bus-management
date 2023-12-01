import ReviewTable from "@/containers/UserDashboard/reviewTable";
import { reviewData } from "@/data/userDashboard/userDashboardData";
import RootLayout from "@/layouts/RootLayout";
import UserDashboardLayout from "@/layouts/UserDashboardLayout";
import React from "react";

const Reviews = () => {

  return (
    <div>
      <ReviewTable data={reviewData} />
    </div>
  );
};

export default Reviews;

Reviews.getLayout = function getLayout(page) {
  return <RootLayout><UserDashboardLayout>{page}</UserDashboardLayout></RootLayout>;
};
