import RootLayout from "@/layouts/RootLayout";
import UserDashboardLayout from "@/layouts/UserDashboardLayout";
import React from "react";

const UserDashboard = () => {
  return (
    <div>
      <UserDashboardLayout />
    </div>
  );
};

export default UserDashboard;

UserDashboard.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
