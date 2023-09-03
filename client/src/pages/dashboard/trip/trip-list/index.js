import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import TripListContainer from "@/containers/AdminDashboard/Trip/TripList/index.js";
import React from "react";

const TripList = () => {
  return <>{"admin" === userRole.ADMIN && <TripListContainer />}</>;
};

export default TripList;

TripList.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
