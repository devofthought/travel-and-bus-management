import { userRole } from "@/config/userRole";
import CreateRouteContainer from "@/containers/AdminDashboard/Route/CreateRoute";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const CreateRoute = () => {
  return <>{"admin" === userRole.ADMIN && <CreateRouteContainer />}</>;
};

export default CreateRoute;

CreateRoute.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
