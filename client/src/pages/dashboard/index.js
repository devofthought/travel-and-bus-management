import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const Dashboard = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <>
          <h1>admin</h1>
        </>
      )}
    </>
  );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
