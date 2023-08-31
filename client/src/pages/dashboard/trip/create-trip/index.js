import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";
import CreateTripComponent from "@/containers/AdminDashboard/Trip/CreateTrip/CreateTrip";
import BusTable from "@/containers/AdminDashboard/Trip/CreateTrip/BusTable";
const CreateTrip = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <div>
          <CreateTripComponent />
        </div>
      )}
    </>
  );
};

export default CreateTrip;

CreateTrip.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
