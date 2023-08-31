import { userRole } from "@/config/userRole";
import DriverListContainer from "@/containers/AdminDashboard/Driver/DriverList";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const AllDriver = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <>
          <DriverListContainer />
        </>
      )}
    </>
  );
};

export default AllDriver;

AllDriver.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
