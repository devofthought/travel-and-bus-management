import { userRole } from "@/config/userRole";
import UpdateTripContainer from "@/containers/AdminDashboard/Trip/UpdateTrip";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const UpdateTrip = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <>
          <UpdateTripContainer />
        </>
      )}
    </>
  );
};

export default UpdateTrip;

UpdateTrip.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
