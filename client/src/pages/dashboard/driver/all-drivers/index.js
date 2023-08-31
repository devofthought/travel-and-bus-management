import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const AllDriver = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <>
          <h1>this is All driver</h1>
        </>
      )}
    </>
  );
};

export default AllDriver;

AllDriver.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
