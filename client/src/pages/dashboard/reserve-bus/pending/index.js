import { userRole } from "@/config/userRole";
import ReserveBusListContainer from "@/containers/AdminDashboard/ReserveBus/PendingReserve/index.js";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const ReserveBus = () => {
  return <>{"admin" === userRole.ADMIN && <ReserveBusListContainer />}</>;
};

export default ReserveBus;

ReserveBus.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
