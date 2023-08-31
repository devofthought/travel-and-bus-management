import { userRole } from "@/config/userRole";
import CreateIncidentContainer from "@/containers/AdminDashboard/Incident/CreateIncident";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const CreateDriver = () => {
  return <>{"admin" === userRole.ADMIN && <CreateIncidentContainer />}</>;
};

export default CreateDriver;

CreateDriver.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
