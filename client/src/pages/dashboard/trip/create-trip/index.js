import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const CreateTrip = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <>
          <h1>this is create trip</h1>
        </>
      )}
    </>
  );
};

export default CreateTrip;

CreateTrip.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
