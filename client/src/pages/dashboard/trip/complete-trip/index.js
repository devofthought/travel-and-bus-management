import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const CompleteTrip = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <>
          <h1>this is complete trip</h1>
        </>
      )}
    </>
  );
};

export default CompleteTrip;

CompleteTrip.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
