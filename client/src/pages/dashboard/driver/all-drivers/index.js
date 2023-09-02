import { userRole } from "@/config/userRole";
import DriverContainer from "@/containers/AdminDashboard/Driver";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const AllDriver = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <>
          <DriverContainer />
        </>
      )}
    </>
  );
};

export default AllDriver;

AllDriver.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
