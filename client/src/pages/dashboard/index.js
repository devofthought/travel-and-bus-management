import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const Dashboard = () => {
  return <>{"admin" === userRole.ADMIN && <AdminDashboardLayout />}</>;
};

export default Dashboard;
