import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const Incident = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <>
          <h1>this is Incident page</h1>
        </>
      )}
    </>
  );
};

export default Incident;

Incident.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
