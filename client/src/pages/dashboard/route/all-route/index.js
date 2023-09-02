import { userRole } from "@/config/userRole";
import RouteContainer from "@/containers/AdminDashboard/Route/index";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const AllRoute = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <>
          <RouteContainer />
        </>
      )}
    </>
  );
};

export default AllRoute;

AllRoute.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
