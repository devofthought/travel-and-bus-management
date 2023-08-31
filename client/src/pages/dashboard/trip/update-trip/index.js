import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const UpdateTrip = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <>
          <h1>this is Update trip</h1>
        </>
      )}
    </>
  );
};

export default UpdateTrip;

UpdateTrip.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
