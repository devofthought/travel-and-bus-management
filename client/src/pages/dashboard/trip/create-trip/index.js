import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";
import CreateTripContainer from "@/containers/AdminDashboard/Trip/CreateTrip/CreateTrip";
const CreateTrip = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <div>
          <CreateTripContainer />
        </div>
      )}
    </>
  );
};

export default CreateTrip;

CreateTrip.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
