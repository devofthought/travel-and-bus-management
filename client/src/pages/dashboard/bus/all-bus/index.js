import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const AllBus = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <>
          <h1>this is All bus </h1>
        </>
      )}
    </>
  );
};

export default AllBus;

AllBus.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
