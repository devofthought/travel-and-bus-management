import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import CreateBusContainer from "@/containers/AdminDashboard/Bus/CreateBus";

import React from "react";

const CreateBus = () => {
  return <>{"admin" === userRole.ADMIN && <CreateBusContainer />}</>;
};

export default CreateBus;

CreateBus.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
