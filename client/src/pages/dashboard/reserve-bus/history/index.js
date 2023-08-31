import { userRole } from "@/config/userRole";
import ReserveHistoryListContainer from "@/containers/AdminDashboard/ReserveBus/ReserveHistory/index.js";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const ReserveBus = () => {
  return <>{"admin" === userRole.ADMIN && <ReserveHistoryListContainer />}</>;
};

export default ReserveBus;

ReserveBus.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
