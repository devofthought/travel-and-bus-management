import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const TripList = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <>
          <h1>this is Trip list page</h1>
        </>
      )}
    </>
  );
};

export default TripList;

TripList.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
