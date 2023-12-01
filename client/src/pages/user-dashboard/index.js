import PageTitle from "@/components/Shared/PageTitle";
import RootLayout from "@/layouts/RootLayout";
import UserDashboardLayout from "@/layouts/UserDashboardLayout";
import withAuth from "@/utils/withAuth";
import React from "react";
import dynamic from "next/dynamic";

const UserDashboard = () => {
  return (
    <div>
      <PageTitle title={"Dashboard"} />
      <UserDashboardLayout />
    </div>
  );
};

// export default withAuth(UserDashboard, ["traveler"]);
export default dynamic(() => Promise.resolve(withAuth(UserDashboard, ["traveler"])), { ssr: true });


UserDashboard.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};