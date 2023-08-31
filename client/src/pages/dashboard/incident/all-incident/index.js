import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import IncidentListContainer from "@/containers/AdminDashboard/Incident/index.js";

import React from "react";

const Incident = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <>
          <IncidentListContainer />
        </>
      )}
    </>
  );
};

export default Incident;

Incident.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
