import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import BusListContainer from "@/containers/AdminDashboard/Bus/index";
import React from "react";

const AllBus = () => {
  return <>{"admin" === userRole.ADMIN && <BusListContainer />}</>;
};

export default AllBus;

AllBus.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
