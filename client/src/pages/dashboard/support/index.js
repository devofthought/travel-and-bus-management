import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const Support = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <>
          <h1>this is Support </h1>
        </>
      )}
    </>
  );
};

export default Support;

Support.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
