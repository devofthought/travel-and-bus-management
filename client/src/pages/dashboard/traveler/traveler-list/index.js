import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import TravelerListContainer from "@/containers/AdminDashboard/Traveler/TravelerList";

import React from "react";

const TravelerList = () => {
  return <>{"admin" === userRole.ADMIN && <TravelerListContainer />}</>;
};

export default TravelerList;

TravelerList.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
