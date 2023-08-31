import { userRole } from "@/config/userRole";
import CompleteTripTable from "@/containers/AdminDashboard/Trip/CompleteTrip/CompleteTripTable";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const CompleteTrip = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <>
          <CompleteTripTable />
        </>
      )}
    </>
  );
};

export default CompleteTrip;

CompleteTrip.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
