import PageTitle from "@/components/Shared/PageTitle";
import RootLayout from "@/layouts/RootLayout";
import UserDashboardLayout from "@/layouts/UserDashboardLayout";
import withAuth from "@/utils/withAuth";
import React from "react";

const UserDashboard = () => {
  return (
    <div>
      <PageTitle title={"Dashboard"} />
      <UserDashboardLayout />
    </div>
  );
};

export default withAuth(UserDashboard, ["traveler"]);

UserDashboard.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
